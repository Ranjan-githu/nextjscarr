import { GoogleGenAI } from '@google/genai';
import puppeteer from 'puppeteer';

function aiClient(){if(!process.env.GOOGLE_GENAI_API_KEY)throw new Error('GOOGLE_GENAI_API_KEY is required');return new GoogleGenAI({apiKey:process.env.GOOGLE_GENAI_API_KEY});}
export async function generateInterviewReport({resume,selfDescription,jobDescription}){const ai=aiClient();const prompt=`Generate a detailed interview report as JSON with fields: matchScore (0-100 integer), title, technicalQuestions [{question,intention,answer}], behavioralQuestions [{question,intention,answer}], skillGaps [{skill,severity}] where severity is one of low, medium, high, preparationPlan [{day (integer),focus,tasks:[string]}]. Resume: ${resume}. Self description: ${selfDescription}. Job description: ${jobDescription}. Return only valid JSON.`;const response=await ai.models.generateContent({model:'gemini-2.5-flash',contents:prompt});const text=response.text.replace(/```json|```/g,'').trim();return JSON.parse(text);}
function escapeHtml(value=''){return String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]);}
export async function generateResumePdf({resume,selfDescription,jobDescription}){
  let data;
  try {
    const ai=aiClient();
    const prompt=`Create a resume JSON object with these fields only: fullName, summary, skills (array), experience (array of {role,company,details}), education (array). Tailor it to this job. Resume: ${resume}. Self description: ${selfDescription}. Job description: ${jobDescription}.`;
    const response=await ai.models.generateContent({model:'gemini-2.5-flash',contents:prompt});
    data=JSON.parse(response.text.replace(/```json|```/g,'').trim());
  } catch (error) {
    console.warn('AI resume enhancement unavailable; using fallback resume data',error);
    const words=jobDescription.match(/[A-Za-z][A-Za-z+#.-]{1,}/g)||[];
    const skills=[...new Set(words.slice(0,12))];
    data={fullName:'Candidate',summary:selfDescription||resume?.slice(0,500)||'Professional candidate seeking this role.',skills,experience:[{role:'Relevant Experience',company:'',details:resume||selfDescription||'Experience details were not provided.'}],education:['Education details were not provided.']};
  }
  const html=`<!doctype html><html><head><meta charset="utf-8"><style>body{font-family:Arial,sans-serif;margin:30px;color:#111}h1{font-size:28px;border-bottom:2px solid #333;padding-bottom:8px}.summary,.skills,.section{margin:16px 0}.skills{line-height:1.8}</style></head><body><h1>${escapeHtml(data.fullName||'Candidate')}</h1><div class="summary"><strong>Professional Summary</strong><p>${escapeHtml(data.summary)}</p></div><div class="skills"><strong>Skills</strong><p>${(Array.isArray(data.skills)?data.skills:[]).map(escapeHtml).join(', ')}</p></div><div class="section"><strong>Experience</strong>${(Array.isArray(data.experience)?data.experience:[]).map(x=>`<h3>${escapeHtml(x.role)}${x.company?` — ${escapeHtml(x.company)}`:''}</h3><p>${escapeHtml(x.details)}</p>`).join('')}</div><div class="section"><strong>Education</strong><p>${(Array.isArray(data.education)?data.education.map(escapeHtml):[]).join('<br>')}</p></div></body></html>`;
  const browser=await puppeteer.launch({headless:true,args:['--disable-gpu','--no-sandbox','--disable-setuid-sandbox']});
  try {
    const page=await browser.newPage();
    await page.setContent(html,{waitUntil:'domcontentloaded'});
    return await page.pdf({format:'A4',printBackground:true});
  } finally {await browser.close();}
}
