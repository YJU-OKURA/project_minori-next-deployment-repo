import Link from 'next/link';
import Image from 'next/image';
import footer from '@/public/svgs/footer';

const Footer = () => {
  const urls = {
    github: 'https://github.com/YJU-OKURA',
    notion:
      'https://yuminn-k.notion.site/25484dca19294ff8ba2ffc24e5548e8c?pvs=4',
  };
  return (
    <div className="py-7 flex justify-center">
      <div className="w-max flex justify-center items-center">
        {/* <div>
          <Image src={svgs.logo} width={50} height={50} alt="logo" />
        </div> */}
        <div className="text-gray-500 leading-tight">
          <span className="text-sm">Copyright © OKURA</span>
          <br />
          <span className="text-gray-500 text-xs">gimyumin40@gmail.com</span>
        </div>
        <ul className="flex pl-3">
          <li>
            <Link href={urls.github}>
              <Image src={footer.github} width={50} height={50} alt="github" />
            </Link>
          </li>
          <li>
            <Link href={urls.notion}>
              <Image src={footer.notion} width={50} height={50} alt="notion" />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
