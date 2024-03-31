import { API_PATH } from '@constants/api';
import { useApi } from '@hooks/useApi';
import { useEffectOnce } from '@hooks/useEffectOnce';
import { useLayout } from '@hooks/useLayout';
import React from 'react';

import { IMyInfo } from '../interfaces/mypage/edit';

import SvgIcon from '@/components/common/icon/SvgIcon';

export default function MyPageLayout({
   children,
   getStudentId,
}: {
   children: React.ReactNode;
   getStudentId?: (id: string) => void;
}) {
   const { setLayout } = useLayout();
   const [myInfo, setMyInfo] = React.useState<IMyInfo | null>(null);
   const { get } = useApi();

   const fetchMyInfo = async () => {
      const data = await get<IMyInfo>(API_PATH.USER.ME, { authenticate: true });
      setMyInfo(data);
      getStudentId && getStudentId(data.studentId);
   };
   useEffectOnce(() => {
      fetchMyInfo();
      setLayout({
         title: '',
         backButton: true,
         isMain: false,
         fullscreen: false,
         headingStyle: '',
         headingText: '',
         subHeadingText: '',
         margin: '',
         rounded: false,
      });
   });

   return (
      <div className='h-[calc(100vh-110px)]'>
         <div className='flex justify-between px-8 pt-4 pb-14 bg-black text-white'>
            <div className='flex flex-col justify-evenly w-7/12'>
               <strong className='text-2xl'>{myInfo?.nickname}</strong>
               <p>
                  {myInfo?.studentId} <br />
                  {myInfo?.department} {myInfo?.major}
               </p>
            </div>
            <ProfileImage gender={myInfo?.gender ?? '남자'} />
         </div>
         {children}
      </div>
   );
}

export const ProfileImage = ({ gender }: { gender: '남자' | '여자' }) => (
   <div className='bg-[#D9D9D9] rounded-full'>{profileData[gender]}</div>
);

const profileData = {
   남자: <SvgIcon id='male_icon' width={100} height={100} />,
   여자: <SvgIcon id='female_icon' width={100} height={100} />,
};
