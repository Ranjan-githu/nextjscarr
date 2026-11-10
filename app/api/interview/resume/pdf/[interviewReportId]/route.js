import { NextResponse } from 'next/server';
import { connectDB } from '../../../../../../lib/db';
import { getUserFromRequest } from '../../../../../../lib/auth';
import { InterviewReport } from '../../../../../../lib/models';
import { generateResumePdf } from '../../../../../../lib/ai';
export async function POST(request, { params }) {
  await connectDB();
  const user = await getUserFromRequest();
  if (!user)
    return NextResponse.json(
      { message: 'Token not provided.' },
      { status: 401 }
    );
  const { interviewReportId } = await params;
  const report = await InterviewReport.findOne({
    _id: interviewReportId,
    user: user.id,
  });
  if (!report)
    return NextResponse.json(
      { message: 'Interview report not found.' },
      { status: 404 }
    );
  try {
    const pdf = await generateResumePdf({
      resume: report.resume,
      jobDescription: report.jobDescription,
      selfDescription: report.selfDescription,
    });
    return new NextResponse(new Uint8Array(pdf), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename=resume_${interviewReportId}.pdf`,
      },
    });
  } catch (error) {
    console.error('Failed to generate PDF', error);
    const detail = String(error?.message || error || '');
    if (detail.includes('Could not find Chrome') || detail.includes('browser'))
      return NextResponse.json(
        {
          message:
            'PDF browser is unavailable. Please restart the application and try again.',
        },
        { status: 503 }
      );
    return NextResponse.json(
      { message: 'Could not generate the resume PDF. Please try again.' },
      { status: 500 }
    );
  }
}
