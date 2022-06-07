import { useRouter } from 'next/router';

function SidebarLink({
  Icon,
  text,
  active,
  cal,
  create,
  addcalendar,
  bring,
  release,
}) {
  const router = useRouter();
  return (
    <div
      className={`text-[#d9d9d9] flex items-center justify-center xl:justify-start text-xl space-x-3 hoverAnimation ${
        active && 'font-bold'
      }`}
      onClick={() =>
        (active && router.push('/')) ||
        (cal && router.push('/cal')) ||
        (create && router.push('/create')) ||
        (bring && router.push('/bring')) ||
        (release && router.push('/release')) ||
        (addcalendar && router.push('/addcalendar'))
      }
    >
      <Icon className="h-7" />
      <span className="hidden xl:inline">{text}</span>
    </div>
  );
}

export default SidebarLink;
