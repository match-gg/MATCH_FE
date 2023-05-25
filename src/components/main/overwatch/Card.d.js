// 포지션 이미지 링크 임시로 가져옴
export const positionInfo = [
  { id: 'TANK', image: 'https://www.hungryapp.co.kr/rank/overwatch/img/role-tank.png', kor: '돌격' },
  { id: 'DAMAGE', image: 'https://www.hungryapp.co.kr/rank/overwatch/img/role-offense.png', kor: '공격' },
  { id: 'SUPPORT', image: 'https://www.hungryapp.co.kr/rank/overwatch/img/role-support.png', kor: '지원' },
  {
    id: 'ALL',
    image: 'https://d18ghgbbpc0qi2.cloudfront.net/lol/lane_icons/ALL1.png',
    kor: '아무나',
  },
];

// 나무위키에서 티어 이미지 링크 임시로 가져옴
export const rank_emblems = {
  GRANDMASTER: 'https://i.namu.wiki/i/AJnWNtepqXuMymXVZTkO4IFZVNi9V1JPWsNmUEnzxVktuD4BCyUn5z5vJMA8ZZCOdHYCmiotscJUwZDkCPJKgo8B268riyYiZ2sfkOKg0yRHfM_m4cF1HkRcdjEq6tStE88jBeozOQShxvHZURIa4A.webp',
  MASTER: 'https://i.namu.wiki/i/BmxvYLIiv_diXY6EV-MRS5xrNO91-b64UKdbtIevNOzYu7jGauQl0Nhm0HtPDZV-Q414buz-GF_NyC78fK4AXElGQ0cmqbrYBHkAv_muXdB8MZBM7qz5r9GyZ38ZXWk-__Ti79Qt7Mi-ovJRvLH92A.webp',
  DIAMOND: 'https://i.namu.wiki/i/U1VmuA1vkBLd9U6S6wftGS1XTKRYmSB4NwwCNiKbcAjOXelTXihzi6xEeWalM50rzKPYNZ_oIyAh6vuHvCmNfgmUtZEfJHMRV3jrUJZSElDqOhEeuWEWtMeoE-Zu2EhSPxsPcCCi9aheDUnwPlzmMw.webp',
  PLATINUM: 'https://i.namu.wiki/i/y0ttsSPlX0z3NmlG7pW8kMfcVcLcqwneSDvaQ7hLRciRAGjEwKboe06T7wUjAPU3CrLARn_W0TJ6BqMhqZOsYV4NeympDUEkTFzdGYGq-kMj8eN-y7IGLd5Hyh7uicmiJO0AVxQXZSv0aax4kyj1qQ.webp',
  GOLD: 'https://i.namu.wiki/i/wVgK7PoO4Xx0Ec_xtb3iidzl2qPCVN_CVnD1wMDNQ3CjmjoZXQ09xVcsE1TSl9-hpkc7kLlovLj6niP8YfT1CbObLYEclG8UVQIsQ2l5TBvJxxFIVCqxKEY_YMyo6a5wMi86qim7zcclJd5jvxS3WA.webp',
  SILVER: 'https://i.namu.wiki/i/G_WIuA40FrNX6RkuFDq3F51iEvfGgDnXQ7CA-BUOf4qWERqq_t5WTLL8rBpoZ-zH39vt3DpVBD2FphzBO1jgU16XpX9C7N0Mhb1VgMSx8wpKHXdocukSV1po2yPO937vjtD-N4-LKKEQuuQWWSEqYg.webp',
  BRONZE: 'https://i.namu.wiki/i/8W2zGDQV3t2idWmLrnXbSgVpQgODe2wkyxUXm1XV3fqZRtWpR1CCCcBazQDUubSlDkNuMEDe_ncQlxNyjyou_BpduEJhfTsqgN_t0PybRrzW-kqY2dd2Z-gm-81tXwA6hE8wiaqXrEBFIvXU0QiGmA.webp',
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
  { id: 'ALL', kor: '모든 큐', maxMember: 5 },
  { id: 'NORMAL', kor: '일반게임', maxMember: 5 },
  { id: 'COMPETITIVE_ROLE', kor: '경쟁전(역할고정)', maxMember: 5 },
  { id: 'COMPETITIVE_OPEN', kor: '경쟁전(자유)', maxMember: 5 },
  { id: 'ARCADE', kor: '아케이드', maxMember: 5 },
];
