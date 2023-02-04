import React from 'react';

import InputGameInfo from './InputGameInfo';

import lolIcon from './logo_images/LoL_Icon_Flat_BLACK.png';
import pubgIcon from './logo_images/Pubg_Logo.png';
import overwatchIcon from './logo_images/overwatch_logo.png';
import lostarkIcon from './logo_images/lost_Ark_Logo.png';
import maplestoryIcon from './logo_images/maplestory_logo.png';
import RegisterLayout from './RegisterLayout';

const RegisterGames = () => {
    return (
        <RegisterLayout
            title={'플레이하는 게임과 닉네임을 알려주세요.'}
            description={'(이후에 마이페이지에서 수정이 가능합니다.)'}
            prevLink={'/register/terms'}
            nextLink={'/register/favgame'}
            phase={2}
        >
            <InputGameInfo
                gameIcon={lolIcon}
                nickname={'소환사명을 입력하세요.'}
                altMessage={'리그오브레전드_아이콘'}
            />
            <InputGameInfo
                gameIcon={pubgIcon}
                nickname={'캐릭터명을 입력하세요.'}
                altMessage={'배틀그라운드_아이콘'}
            />
            <InputGameInfo
                gameIcon={overwatchIcon}
                nickname={'플레이어 이름 또는 배틀태그#1234 입력하세요.'}
                altMessage={'오버워치_아이콘'}
            />
            <InputGameInfo
                gameIcon={lostarkIcon}
                nickname={'캐릭터명을 입력하세요.'}
                altMessage={'로스트아크_아이콘'}
            />
            <InputGameInfo
                gameIcon={maplestoryIcon}
                nickname={'캐릭터명을 입력하세요.'}
                altMessage={'메이플스토리_아이콘'}
            />
        </RegisterLayout>
    );
};

export default RegisterGames;
