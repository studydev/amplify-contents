import { I18n } from 'aws-amplify'

export default function Language() {
  I18n.setLanguage('kr');
  const dict = {
      'kr': {
          'Sign In': "로그인",
          'Sign in to your account': "계정 로그인",
          'Username *': "사용자 ID *",
          'Password *': "비밀번호 *",
          'Username': "사용자 ID",
          'Password': "비밀번호",
          'Forgot your password?': " ",
          'Reset password': "비밀번호 재발급",
          'No account?': " ",
          'Create account': "신규 계정 생성",
          'Enter your username': "사용자 ID를 입력하세요...",
          'Enter your password': "비밀번호를 입력하세요...",
          'Email Address *': "이메일 *",
          'Email': "이메일 주소를 입력하세요...",
          'Phone Number *': "전화번호",
          '(555) 555-1212': "01012345678",
          'Have an account?': " ",
          'Sign in': "로그인으로 돌아가기",
          'Create a new account': "신규 계정 생성",
          'Create Account': "계정 생성",
          'Reset your password': "비밀번호 리셋",
          'Send Code': "이메일 발송",
          'Back to Sign In': "로그인으로 돌아가기",
          'Sign Out':"로그아웃"
      }
  };
  
  I18n.putVocabularies(dict);

  return (
    <>
    </>
  )
}