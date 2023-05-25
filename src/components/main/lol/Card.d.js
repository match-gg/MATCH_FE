export const lanes = [
  { id: 'TOP', image: 'https://d18ghgbbpc0qi2.cloudfront.net/lol/lane_icons/TOP.png', kor: '탑' },
  { id: 'JUG', image: 'https://d18ghgbbpc0qi2.cloudfront.net/lol/lane_icons/JUG.png', kor: '정글' },
  { id: 'MID', image: 'https://d18ghgbbpc0qi2.cloudfront.net/lol/lane_icons/MID.png', kor: '미드' },
  { id: 'ADC', image: 'https://d18ghgbbpc0qi2.cloudfront.net/lol/lane_icons/ADC.png', kor: '원딜' },
  {
    id: 'SPT',
    image: 'https://d18ghgbbpc0qi2.cloudfront.net/lol/lane_icons/SUP.png',
    kor: '서포터',
  },
  {
    id: 'ALL',
    image: 'https://d18ghgbbpc0qi2.cloudfront.net/lol/lane_icons/ALL1.png',
    kor: '상관없음',
  },
];

export const rank_emblems = {
  CHALLENGER: 'https://d18ghgbbpc0qi2.cloudfront.net/lol/ranked_emblems/challenger.png',
  GRANDMASTER: 'https://d18ghgbbpc0qi2.cloudfront.net/lol/ranked_emblems/grandmaster.png',
  MASTER: 'https://d18ghgbbpc0qi2.cloudfront.net/lol/ranked_emblems/master.png',
  DIAMOND: 'https://d18ghgbbpc0qi2.cloudfront.net/lol/ranked_emblems/diamond.png',
  PLATINUM: 'https://d18ghgbbpc0qi2.cloudfront.net/lol/ranked_emblems/platinum.png',
  GOLD: 'https://d18ghgbbpc0qi2.cloudfront.net/lol/ranked_emblems/gold.png',
  SILVER: 'https://d18ghgbbpc0qi2.cloudfront.net/lol/ranked_emblems/silver.png',
  BRONZE: 'https://d18ghgbbpc0qi2.cloudfront.net/lol/ranked_emblems/bronze.png',
  IRON: 'https://d18ghgbbpc0qi2.cloudfront.net/lol/ranked_emblems/iron.png',
};

export const expiredTime = {
  FIFTEEN_M: 15 * 60 * 1000,
  THIRTY_M: 30 * 60 * 1000,
  ONE_H: 1 * 60 * 60 * 1000,
  TWO_H: 2 * 60 * 60 * 1000,
  THREE_H: 3 * 60 * 60 * 1000,
  SIX_H: 6 * 60 * 60 * 1000,
  TWELVE_H: 12 * 60 * 60 * 1000,
  TWENTY_FOUR_H: 24 * 60 * 60 * 1000,
};

export const tierInfo = [
  { id: 'BRONZE', color: '#b05a3c', kor: '브론즈' },
  { id: 'SILVER', color: '#b3b5bb', kor: '실버' },
  { id: 'GOLD', color: '#e7c352', kor: '골드' },
  { id: 'PLATINUM', color: '#b4d2be', kor: '플래티넘' },
  { id: 'DIAMOND', color: '#aac3de', kor: '다이아몬드' },
  { id: 'MASTER', color: '#ebd973', kor: '마스터' },
  { id: 'GRANDMASTER', color: '#cde6d6', kor: '그랜드마스터' },
  { id: 'ALL', color: '#000000', kor: '모든티어' },
];

export const typeInfo = [
  { id: 'DUO_RANK', kor: '솔로랭크', maxMember: 2 },
  { id: 'FREE_RANK', kor: '자유랭크', maxMember: 5 },
  { id: 'NORMAL', kor: '일반게임', maxMember: 5 },
  { id: 'ARAM', kor: '칼바람나락', maxMember: 5 },
  { id: 'ALL', kor: '모든큐', maxMember: 5 },
];
