import Image from 'next/image';
import { Fragment, useContext, useMemo, useState } from 'react';
import { Dialog, Menu, Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import {
  CogIcon,
  CollectionIcon,
  HeartIcon,
  HomeIcon,
  MenuAlt2Icon,
  PhotographIcon,
  PlusSmIcon as PlusSmIconOutline,
  UserGroupIcon,
  ViewGridIcon as ViewGridIconOutline,
  XIcon,
} from '@heroicons/react/outline';
import {
  PencilIcon,
  PlusSmIcon as PlusSmIconSolid,
  SearchIcon,
  ViewGridIcon as ViewGridIconSolid,
  ViewListIcon,
} from '@heroicons/react/solid';

import {
  HiOutlineSave,
  HiOutlineChartBar,
  HiOutlineDatabase,
  HiOutlineFlag,
  HiOutlinePencilAlt,
} from 'react-icons/hi';
import SidebarLink from './SidebarLink';
import { useParams } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';

const navigation = [
  { name: 'Home', href: '/', icon: HomeIcon, current: false },
  {
    name: '에스엔피 일정',
    href: 'cal',
    icon: ViewGridIconOutline,
    current: false,
  },
  { name: '입고', href: 'bring', icon: HiOutlineSave, current: false },
  { name: '출고', href: 'release', icon: CollectionIcon, current: false },
  { name: '거래처 등록', href: 'create', icon: UserGroupIcon, current: false },
  {
    name: '일정등록',
    href: 'addcalendar',
    icon: HiOutlinePencilAlt,
    current: false,
  },
  { name: '입고 검색', href: '/', icon: HiOutlineFlag, current: false },
  { name: '출고 검색', href: '/', icon: HiOutlineDatabase, current: false },
  {
    name: '매출 매입 통계',
    href: '/',
    icon: HiOutlineChartBar,
    current: false,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
export default function Sidebar() {
  const { mobileMenuOpen, setMobileMenuOpen } = useContext(ThemeContext);
  const { linkId, setLinkID } = useContext(ThemeContext);
  const router = useRouter();

  return (
    <>
      <div className="hidden w-28 bg-indigo-700 overflow-y-auto md:block">
        <div className="w-full py-6 flex flex-col items-center">
          <div className="flex-shrink-0 flex items-center">
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white"
              alt="Workflow"
            />
          </div>
          <div className="flex-1 mt-6 w-full px-2 space-y-1">
            {navigation.map((item) => (
              <a
                key={item.name}
                onClick={() => setLinkID(item.href) || router.push(item.href)}
                className={classNames(
                  linkId == item.href
                    ? 'bg-indigo-800 text-white'
                    : 'text-indigo-100 hover:bg-indigo-800 hover:text-white',
                  'group w-full p-3 rounded-md flex flex-col items-center text-xs font-medium'
                )}
                aria-current={item.current ? 'page' : undefined}
              >
                <item.icon
                  className={classNames(
                    linkId == item.href
                      ? 'text-white'
                      : 'text-indigo-300 group-hover:text-white',
                    'h-6 w-6'
                  )}
                  aria-hidden="true"
                />
                <span className="mt-2">{item.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <Transition.Root show={mobileMenuOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40 md:hidden"
          onClose={setMobileMenuOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative max-w-xs w-full bg-indigo-700 pt-5 pb-4 flex-1 flex flex-col">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-1 right-0 -mr-14 p-1">
                    <button
                      type="button"
                      className="h-12 w-12 rounded-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <XIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                      <span className="sr-only">Close sidebar</span>
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex-shrink-0 px-4 flex items-center">
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white"
                    alt="Workflow"
                  />
                </div>
                <div className="mt-5 flex-1 h-0 px-2 overflow-y-auto">
                  <nav className="h-full flex flex-col">
                    <div className="space-y-1">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? 'bg-indigo-800 text-white'
                              : 'text-indigo-100 hover:bg-indigo-800 hover:text-white',
                            'group py-2 px-3 rounded-md flex items-center text-sm font-medium'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          <item.icon
                            className={classNames(
                              item.current
                                ? 'text-white'
                                : 'text-indigo-300 group-hover:text-white',
                              'mr-3 h-6 w-6'
                            )}
                            aria-hidden="true"
                          />
                          <span>{item.name}</span>
                        </a>
                      ))}
                    </div>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
            <div className="flex-shrink-0 w-14" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

//   return (
//     <div className="hidden sm:flex flex-col items-center xl:items-start xl:w-[340px] p-2 fixed h-full">
//       <div className="flex items-center justify-center w-14 h-14 hoverAnimation p-0 xl:ml-24">
//         <Image src="/logo/360x360white.png" width={30} height={30} />
//         {/* <Image src="/logo/logo360x360.png" width={30} height={30} /> */}
//       </div>
//       <div className="space-y-2.5 mt-4 mb-2.5 xl:ml-24">
//         {/* <SidebarLink text="Home" Icon={HiOutlineHome} active />
//         <SidebarLink text="에스엔피 일정" Icon={HiOutlineCollection} cal /> */}
//         <SidebarLink text="입고 등록" Icon={HiOutlineSave} bring />
//         {/* <SidebarLink text="출고 등록" Icon={HiOutlineTruck} release />
//         <SidebarLink text="거래처등록" Icon={HiUserAdd} create /> */}
//         <SidebarLink text="일정 등록" Icon={HiOutlinePencilAlt} addcalendar />
//         <SidebarLink text="입고 검색" Icon={HiOutlineFlag} />
//         <SidebarLink text="출고 검색" Icon={HiOutlineDatabase} />
//         <SidebarLink text="매출 매입 통계" Icon={HiOutlineChartBar} />
//       </div>
//       <button className="hidden xl:inline ml-auto bg-[#1d9bf0] text-white rounded-full w-56 h-[52px] text-lg font-bold shadow-md hover:bg-[#1a8cd8]">
//         Tweet
//       </button>
//       <div
//         className="text-[#d9d9d9] flex items-center justify-center mt-auto hoverAnimation xl:ml-auto xl:-mr-5"
//         // onClick={signOut}
//       >
//         <img
//           // src={session.user.image}
//           alt=""
//           className="h-10 w-10 rounded-full xl:mr-2.5"
//         />
//         <div className="hidden xl:inline leading-5">
//           {/* <h4 className="font-bold">{session.user.name}</h4>
//           <p className="text-[#6e767d]">@{session.user.tag}</p> */}
//         </div>
//         {/* <DotsHorizontalIcon className="h-5 hidden xl:inline ml-10" /> */}
//       </div>
//     </div>
//   );
// }
