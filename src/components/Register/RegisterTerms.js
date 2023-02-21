import TermSection from './TermSection';
import { Container, Typography, Box } from '@mui/material';
import { useEffect, useState } from 'react';

const termContents1 = (
  <Box>
    <Typography sx={{ fontWeight: 'bold' }}>{'목적'}</Typography>
    <Typography>
      {
        '본 약관은 (주)MATHCH.GG(매치지지)에서 제공하는 서비스의 이용과 관련하여, 회사와 회원간에 서비스 이용에 관한 권리 및 의무와 책임사항, 기타 필요한 사항을 규정하는 것을 목적으로 합니다'
      }
    </Typography>
    <Typography sx={{ fontWeight: 'bold' }}>{'용어의 정의'}</Typography>
    <Typography>
      {
        '1. 서비스 : 개인용 컴퓨터(PC), 휴대형 단말기, 전기통신설비 등을 포함한 각종 유무선 장치와 같이 구현되는 단말기와 상관없이 회사가 제공하는 서비스를 의미합니다.'
      }
    </Typography>
    <Typography>
      {
        '2. 회원: 회사와 서비스 이용계약을 체결하고 회사가 제공하는 서비스를 이용하는 모든 사용자를 의미합니다.'
      }
    </Typography>
    <Typography>
      {
        '3. 계정: 회원의 식별 및 서비스 이용을 위하여 회원이 선정하고 회사가 인증한 문자, 숫자 또는 특수문자의 조합으로 만들어진 식별자(이메일 주소 등)를 의미합니다.'
      }
    </Typography>
    <Typography>
      {
        '4. 비밀번호: 회원의 개인 정보 보호 및 회원의 동일성 확인을 위해서 회원이 정한 문자, 숫자 또는 특수문자의 조합을 의미합니다.'
      }
    </Typography>
    <Typography>
      {
        '5.계정 정보: 계정, 비밀번호, 닉네임 등 회원이 회사에 제공한 일반정보 및 게임 전적 정보 등 생성정보를 통칭합니다.'
      }
    </Typography>
    <Typography>
      {
        '6. 게시물: 회원이 서비스를 이용함에 있어 회원이 서비스에 게시한 문자, 문서, 그림, 음성, 동영상, 링크, 파일 혹은 이들의 조합으로 이루어진 정보 등 모든 정보나 자료를 의미합니다.'
      }
    </Typography>
    <Typography>
      {
        '7.가입신청자: 회사에 대하여 서비스 이용을 신청하였으나 아직 회사로부터 그 서비스 이용에 관하여 동의를 받지 못한 자를 의미합니다.'
      }
    </Typography>
    <Typography sx={{ fontWeight: 'bold' }}>{'이용 약관의 체결'}</Typography>
    <Typography>
      {
        '1. 이용계약은 회원이 서비스에서 제공하는 회원 가입 페이지에서 서비스 이용약관에 동의한 후 이용신청을 하고 신청한 내용에 대해서 회사가 승낙함으로써 체결됩니다.'
      }
    </Typography>
    <Typography>
      {
        '2. 가입신청자는 제1항의 이용신청 시 본인의 실제 정보를 기재하여야 합니다. 식별정보를 허위로 기재하거나 타인의 정보를 도용한 경우 본 약관에 의한 회원의 권리를 주장할 수 없고, 회사는 환급 없이 이용계약을 취소하거나 해지할 수 있습니다.'
      }
    </Typography>
    <Typography>
      {'3. 만 14세 미만의 아동에 대하여는 이용신청을 제한합니다.'}
    </Typography>
    <Typography>
      {
        '4. 회사는 이용약관에 동의한 후 가입신청자에 대해서 원칙적으로 접수 순서에 따라 서비스 이용을 승낙함을 원칙으로 합니다. 다만 회사의 설비에 여유가 없거나 기술적 장애가 있는 경우, 서비스 상의 장애가 발생한 경우, 그 밖에 이용신청의 승낙이 곤란한 경우 일정시간 가입승인을 유보할 수 있습니다.'
      }
    </Typography>
    <Typography>
      {
        '5. 회사는 신청에 대해서 승낙하지 않거나 사후에 이용계약을 해지할 수 있습니다'
      }
    </Typography>
  </Box>
);

const termContents2 = (
  <Box>
    <Typography sx={{ fontWeight: 'bold' }}>
      {'수집하는 개인정보의 항목'}
    </Typography>
    <Typography>{'1. 홈페이지 회원가입 및 관리'}</Typography>
    <Typography>{'2. 민원사무 처리'}</Typography>
    <Typography sx={{ fontWeight: 'bold' }}>
      {'개인정보의 수집, 이용 목적'}
    </Typography>
    <Typography>
      {
        '1. 회원 가입의사 확인, 회원자격 유지, 관리, 서비스 부정이용 방지, 각종 고지, 통지, 분쟁 조정을 위한 기록 보존 등을 목적으로 개인정보를 수집, 이용 합니다.'
      }
    </Typography>
    <Typography>
      {
        '2. 민원인의 신원 확인, 민원사항 확인, 사실조사를 위한 연락, 통지, 처리결과 통보 등을 목적으로 개인정보를 수집, 이용 합니다.'
      }
    </Typography>
    <Typography sx={{ fontWeight: 'bold' }}>{'개인정보보호 의무'}</Typography>
    <Typography>
      {
        '1. 회사는 정보통신망 이용촉진 및 정보보호 등에 관한 법률, 개인정보 보호법 등 관계 법령이 정하는 바에 따라 회원의 개인정보를 보호하기 위해 노력합니다. 개인정보의 보호 및 사용에 대해서는 관련법 및 회사의 개인정보처리방침이 적용됩니다. 다만, 회사의 공식 사이트 이외의 링크된 사이트에서는 회사의 개인정보처리방침이 적용되지 않습니다.'
      }
    </Typography>
    <Typography>
      {
        '2. 회사는 서비스를 중단하거나 회원이 개인정보 제공 동의를 철회한 경우에는 신속하게 회원의 개인정보를 파기합니다. 단, 개인정보처리방침에서 정하는 바에 따라 특정 정보는 일정 기간 동안 보관할 수 있습니다.'
      }
    </Typography>
    <Typography sx={{ fontWeight: 'bold' }}>
      {'회원의 아이디 및 비밀번호'}
    </Typography>
    <Typography>
      {'1. 회원은 계정과 비밀번호에 관해서 관리책임이 있습니다.'}
    </Typography>
    <Typography>
      {'2. 회원은 계정 및 비밀번호를 제3자가 이용하도록 제공하여서는 안됩니다.'}
    </Typography>
    <Typography>
      {
        '3. 회사는 회원이 계정 및 비밀번호를 소홀히 관리하여 발생하는 서비스 이용상의 손해 또는 회사의 고의 또는 중대한 과실이 없는 제3자의 부정이용 등으로 인한 손해에 대해 책임을 지지 않습니다.'
      }
    </Typography>
    <Typography>
      {
        '4. 회원은 계정 및 비밀번호가 도용되거나 제3자가 사용하고 있음을 인지한 경우에는 이를 즉시 회사에 통지하고 회사의 안내에 따라야 합니다.'
      }
    </Typography>
    <Typography sx={{ fontWeight: 'bold' }}>{'이용의 제한'}</Typography>
    <Typography>
      {
        '1. 회사가 본 약관의 위반 행위를 조사하는 과정에서 당해 계정이 특정 위반행위에 직∙간접적으로 관련되어 있는 경우 등 다른 회원의 권익 보호 및 서비스의 질서유지를 위해 불가피할 경우에는 해당 계정의 이용을 일시적으로 정지할 수 있습니다.'
      }
    </Typography>
    <Typography>
      {
        '2. 회사는 회원이 본 약관을 위반한 경우 및 서비스의 정상적인 운영을 방해한 경우에는 사전 통보 후 회원 자격을 제한, 이용계약을 해지하거나 또는 기간을 정하여 서비스의 이용을 중지할 수 있습니다.'
      }
    </Typography>
    <Typography>
      {
        '3. 회사는 전항에도 불구하고, 저작권법을 위반한 불법프로그램의 제공 및 운영방해, 정보통신망 이용촉진 및 정보보호 등에 관한 법률을 위반한 불법통신 및 해킹, 악성프로그램의 배포, 접속권한 초과행위 등과 같이 관련법을 위반한 경우에는 즉시 영구이용정지를 할 수 있습니다.'
      }
    </Typography>
    <Typography>
      {
        '4. 회사는 회원이 계속해서 1년 이상 로그인하지 않는 경우, 회원정보의 보호 및 운영의 효율성을 위해 이용을 제한할 수 있습니다.'
      }
    </Typography>
    <Typography>
      {
        '5. 회원이 본 조에 따른 회사의 이용제한에 불복하고자 할 때에는 통보를 받은 날로부터 15일 이내에 회사의 이용제한에 불복하는 이유를 기재한 이의신청서를 서면, 이메일 또는 이에 준하는 방법으로 회사에 제출하여야 합니다. 이의신청서를 접수한 회사는 접수한 날로부터 15일 이내에 회원의 불복 이유에 대하여 서면, 이메일 또는 이에 준하는 방법으로 답변하고 답변 내용에 따라 상응하는 조치를 취하여야 합니다. 다만, 회사는 15일 이내에 답변이 곤란한 경우 회원에게 그 사유와 처리일정을 통보하여야 합니다.'
      }
    </Typography>
  </Box>
);

const RegisterTerm = (props) => {
  const { activateNextBtn, deactivateNextBtn } = props;
  const [term1, setTerm1] = useState(false);
  const [term2, setTerm2] = useState(false);

  const agreeTerm1 = () => {
    setTerm1(true);
  };
  const disagreeTerm1 = () => {
    setTerm1(false);
  };
  const agreeTerm2 = () => {
    setTerm2(true);
  };
  const disagreeTerm2 = () => {
    setTerm2(false);
  };
  useEffect(() => {
    if (term1 && term2) {
      activateNextBtn();
    } else {
      deactivateNextBtn();
    }
  }, [term1, term2]);

  return (
    <Container>
      <TermSection
        title={'MATCH.GG 약관 동의'}
        term={term1}
        agreeTerm={agreeTerm1}
        disagreeTerm={disagreeTerm1}
        termContents={termContents1}
      />
      <TermSection
        title={'개인정보 약관 동의'}
        term={term2}
        agreeTerm={agreeTerm2}
        disagreeTerm={disagreeTerm2}
        termContents={termContents2}
      />
    </Container>
  );
};

export default RegisterTerm;
