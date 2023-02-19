import RegisterGames from './RegisterGames';
import RegisterFavGame from './RegisterFavGame';
import RegisterNotification from './RegisterNotification';
import RegisterSuccess from './RegisterSuccess';
import RegisterTerm from './RegisterTerms';

const RegisterBody = [
  {
    phase: 0,
    title: '약관 동의하기',
    description: '아래 약관을 동의해야 MATCH.GG 서비스를 이용하실 수 있습니다.',
    contents: [<RegisterTerm />],
  },
  {
    phase: 1,
    title: '플레이하는 게임과 닉네임을 알려주세요',
    description: '(이후에 마이페이지에서 수정이 가능합니다)',
    contents: [<RegisterGames />],
  },
  {
    phase: 2,
    title: '대표게임을 설정해 주세요.',
    description: '(이후에 마이페이지에서 수정이 가능합니다.)',
    contents: [<RegisterFavGame />],
  },
  {
    phase: 3,
    title: '알림으로 더 빠르게 듀오를 찾아보세요',
    description: '전화번호 인증 / 등록으로 알림을 받아볼 수 있습니다.',
    contents: [<RegisterNotification />],
  },
  {
    phase: 4,
    title: '회원가입이 완료되었습니다.',
    description: '',
    contents: [<RegisterSuccess />],
  },
];

export default RegisterBody;
