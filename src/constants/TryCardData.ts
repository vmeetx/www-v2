import MusicBlocksImg from '../assets/Cards/MusicBlocks.png';
import TurtleBlocksImg from '../assets/Cards/TurtleBlocks.png';
import SugarizerImg from '../assets/Cards/Sugarizer.png';
import BootableDriveImg from '../assets/Cards/BootableDrive.png';
import DesktopInitializationImg from '../assets/Cards/DesktopInitialization.png';
import TriquelImg from '../assets/Cards/Triquel.png';
import RaspberryPiImg from '../assets/Cards/RaspberryPi.png';
import FlatpackImg from '../assets/Cards/Flatpack.png';

interface CardDataType {
  title: string;
  description: string;
  tryNowText: string;
  tryNowHref: string;
  learnMoreText: string;
  learnMoreHref: string;
  imagePath: string;
  gradientClass: string;
}

const TryCardData: CardDataType[] = [
  {
    title: 'Music Blocks',
    description:
      'Create musical code with the browser-based visual programming language Music Blocks',
    tryNowText: 'Try Music Blocks now!',
    tryNowHref: '#',
    learnMoreText: 'Learn more about Music Blocks',
    learnMoreHref: '#',
    imagePath: MusicBlocksImg,
    gradientClass: 'bg-gradient-to-r from-blue-700 to-blue-500',
  },
  {
    title: 'Turtle Blocks',
    description:
      'Explore math and computation through beautiful, artful and creative geometry.',
    tryNowText: 'Try Turtle Blocks now!',
    tryNowHref: '#',
    learnMoreText: 'Learn more about Turtle Blocks',
    learnMoreHref: '#',
    imagePath: TurtleBlocksImg,
    gradientClass: 'bg-gradient-to-r from-pink-600 to-blue-500',
  },
  {
    title: 'Try now on any device with Sugarizer.',
    description:
      'Get a taste of Sugar with Sugarizer, which opens in your browser with no installation.',
    tryNowText: 'Try Sugarizer now!',
    tryNowHref: '#',
    learnMoreText: 'Learn more about Sugarizer',
    learnMoreHref: '#',
    imagePath: SugarizerImg,
    gradientClass: 'bg-gradient-to-r from-yellow-400 to-green-500',
  },
  {
    title: 'Desktop/laptop bootable drive',
    description:
      'With Sugar a Stick (SOAS), you can experience the full Sugar Learning Platform on any computer at any time from a bootable thumb drive',
    tryNowText: 'Try Bootable drive now!',
    tryNowHref: '#',
    learnMoreText: 'Learn more about Bootable Drive',
    learnMoreHref: '#',
    imagePath: BootableDriveImg,
    gradientClass: 'bg-gradient-to-r from-gray-900 to-gray-400',
  },
  {
    title: 'Desktop/laptop installation',
    description:
      'Sugar Learning platform can be installed as a full operating system on ost desktop and laptop computers.',
    tryNowText: 'Try Desktop Installation now!',
    tryNowHref: '#',
    learnMoreText: 'Learn more about Installation',
    learnMoreHref: '#',
    imagePath: DesktopInitializationImg,
    gradientClass: 'bg-gradient-to-r from-blue-700 to-blue-500',
  },
  {
    title: 'Try Triquel for full freedom',
    description:
      'Get all the benefits of a bootable/installation frive on the fully free and well maintained Triquel distro.',
    tryNowText: 'Try Triquel now!',
    tryNowHref: '#',
    learnMoreText: 'Learn more about Triquel',
    learnMoreHref: '#',
    imagePath: TriquelImg,
    gradientClass: 'bg-gradient-to-r from-blue-700 to-blue-900',
  },
  {
    title: 'Try Sugar on Raspberry Pi',
    description: 'The full Sugar environment on a Raspberry P.(RPk)',
    tryNowText: 'Try Raspberry Pi now!',
    tryNowHref: '#',
    learnMoreText: 'Learn more about Raspberry Pi',
    learnMoreHref: '#',
    imagePath: RaspberryPiImg,
    gradientClass: 'bg-gradient-to-r from-red-600 to-green-500',
  },
  {
    title: 'Convenient installation via Flatpak',
    description:
      'Create musical code with the browser based visual programming language Music Blocks',
    tryNowText: 'Try Flatpack now!',
    tryNowHref: '#',
    learnMoreText: 'Learn more about Flatpack',
    learnMoreHref: '#',
    imagePath: FlatpackImg,
    gradientClass: 'bg-gradient-to-r from-gray-400 to-gray-900',
  },
];

export default TryCardData;
