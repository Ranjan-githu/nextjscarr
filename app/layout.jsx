import './globals.scss';
import { AuthProvider } from '../components/auth-provider';
import { InterviewProvider } from '../components/interview-provider';
export const metadata = {
  title: 'CarrierGuider AI',
  description: 'AI-powered interview preparation',
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <InterviewProvider>{children}</InterviewProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
