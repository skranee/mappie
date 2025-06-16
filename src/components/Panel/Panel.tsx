import styles from './Panel.module.css';
import { useAppSelector } from '@/hooks/useAppSelector.ts';
import { useAppDispatch } from '@/hooks/useAppDispatch.ts';
import { Input } from '@/components/controls/Input/Input.tsx';
import { Card } from '@/components/Card/Card.tsx';
import { setIsOpen, setMode } from '@/store/slices/PanelSlice.ts';
import { Details } from '@/components/Details/Details.tsx';
import { SearchPanel } from '@/components/SearchPanel/SearchPanel.tsx';
import { useEffect, useState } from 'react';
import ArrowLeft from '@/assets/icons/arrow-left.svg';
import { MAP_OBJECTS } from '@/constants/MapObjects.ts';

type dataType = {
  title: string;
  description: string;
  image: string;
};

const fakeData = [
  {
    title: 'Парк',
    description:
      'Lörem ipsum jere. Intrabel peraktiv pävufåsk läslov pide. Exon prelogi. Någonstansare  begöpp. Homoadoption tesände keck såsom köttrymden. Epigen digon fast svennefiera håven postfaktisk. Atomslöjd defåling nigovena tegt i platt-tv. Sextremism julgranssyndrom. Rit-avdrag fyr, jukanat don. Apfälla menskopp eftersom spetät senessa inklusive mepaktiga. Bloggbävning makroligt spepp gönas. Sitskate epir tidsfönster. Hjärtslagslag defånera. Neck röstsamtal möbelhund. Hexaledes ryggsäcksmodellen hikikomori när stenomiheten täpos. Du kan vara drabbad. ',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Fronalpstock_big.jpg/1200px-Fronalpstock_big.jpg',
  },
  {
    title: 'Фантаcмагарический музей им. П.М. Машерова',
    description:
      'Lörem ipsum jere. Intrabel peraktiv pävufåsk läslov pide. Exon prelogi. Någonstansare  begöpp. Homoadoption tesände keck såsom köttrymden. Epigen digon fast svennefiera håven postfaktisk. Atomslöjd defåling nigovena tegt i platt-tv. Sextremism julgranssyndrom. Rit-avdrag fyr, jukanat don. Apfälla menskopp eftersom spetät senessa inklusive mepaktiga. Bloggbävning makroligt spepp gönas. Sitskate epir tidsfönster. Hjärtslagslag defånera. Neck röstsamtal möbelhund. Hexaledes ryggsäcksmodellen hikikomori när stenomiheten täpos. Du kan vara drabbad. ',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Fronalpstock_big.jpg/1200px-Fronalpstock_big.jpg',
  },
  {
    title: 'Фантаcмагарический музей им. П.М. Машерова',
    description:
      'Lörem ipsum jere. Intrabel peraktiv pävufåsk läslov pide. Exon prelogi. Någonstansare  begöpp. Homoadoption tesände keck såsom köttrymden. Epigen digon fast svennefiera håven postfaktisk. Atomslöjd defåling nigovena tegt i platt-tv. Sextremism julgranssyndrom. Rit-avdrag fyr, jukanat don. Apfälla menskopp eftersom spetät senessa inklusive mepaktiga. Bloggbävning makroligt spepp gönas. Sitskate epir tidsfönster. Hjärtslagslag defånera. Neck röstsamtal möbelhund. Hexaledes ryggsäcksmodellen hikikomori när stenomiheten täpos. Du kan vara drabbad. ',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Fronalpstock_big.jpg/1200px-Fronalpstock_big.jpg',
  },
  {
    title: 'Фантаcмагарический музей им. П.М. Машерова',
    description:
      'Lörem ipsum jere. Intrabel peraktiv pävufåsk läslov pide. Exon prelogi. Någonstansare  begöpp. Homoadoption tesände keck såsom köttrymden. Epigen digon fast svennefiera håven postfaktisk. Atomslöjd defåling nigovena tegt i platt-tv. Sextremism julgranssyndrom. Rit-avdrag fyr, jukanat don. Apfälla menskopp eftersom spetät senessa inklusive mepaktiga. Bloggbävning makroligt spepp gönas. Sitskate epir tidsfönster. Hjärtslagslag defånera. Neck röstsamtal möbelhund. Hexaledes ryggsäcksmodellen hikikomori när stenomiheten täpos. Du kan vara drabbad. ',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Fronalpstock_big.jpg/1200px-Fronalpstock_big.jpg',
  },
  {
    title: 'Фантаcмагарический музей им. П.М. Машерова',
    description:
      'Lörem ipsum jere. Intrabel peraktiv pävufåsk läslov pide. Exon prelogi. Någonstansare  begöpp. Homoadoption tesände keck såsom köttrymden. Epigen digon fast svennefiera håven postfaktisk. Atomslöjd defåling nigovena tegt i platt-tv. Sextremism julgranssyndrom. Rit-avdrag fyr, jukanat don. Apfälla menskopp eftersom spetät senessa inklusive mepaktiga. Bloggbävning makroligt spepp gönas. Sitskate epir tidsfönster. Hjärtslagslag defånera. Neck röstsamtal möbelhund. Hexaledes ryggsäcksmodellen hikikomori när stenomiheten täpos. Du kan vara drabbad. ',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Fronalpstock_big.jpg/1200px-Fronalpstock_big.jpg',
  },
  {
    title: 'Фантаcмагарический музей им. П.М. Машерова',
    description:
      'Lörem ipsum jere. Intrabel peraktiv pävufåsk läslov pide. Exon prelogi. Någonstansare  begöpp. Homoadoption tesände keck såsom köttrymden. Epigen digon fast svennefiera håven postfaktisk. Atomslöjd defåling nigovena tegt i platt-tv. Sextremism julgranssyndrom. Rit-avdrag fyr, jukanat don. Apfälla menskopp eftersom spetät senessa inklusive mepaktiga. Bloggbävning makroligt spepp gönas. Sitskate epir tidsfönster. Hjärtslagslag defånera. Neck röstsamtal möbelhund. Hexaledes ryggsäcksmodellen hikikomori när stenomiheten täpos. Du kan vara drabbad. ',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Fronalpstock_big.jpg/1200px-Fronalpstock_big.jpg',
  },
];

export const Panel = () => {
  const mode = useAppSelector(state => state.panel.mode);
  const isOpen = useAppSelector(state => state.panel.isOpen);

  const dispatch = useAppDispatch();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [filteredPlaces, setFilteredPlaces] = useState<dataType[]>([]);

  useEffect(() => {
    if (searchValue) {
      setFilteredPlaces(
        fakeData.filter(place => place.title.toLowerCase().includes(searchValue.toLowerCase()))
      );
    } else {
      setFilteredPlaces(fakeData);
    }
  }, [searchValue]);

  const goToDetails = (title: string, description: string, image: string) => {
    setTitle(title);
    setDescription(description);
    setImage(image);

    dispatch(setMode('landmark'));
  };

  const goBack = () => {
    dispatch(setMode('saved'));
  };

  const closePanel = () => {
    dispatch(setIsOpen(false));
  };

  return (
    <div
      className={`
        ${styles.panel} 
        ${mode === 'landmark' ? styles.panel__landmark : ''} 
        ${isOpen ? '' : styles[`panel--closed`]}
      `}
    >
      <Input
        value={searchValue}
        version={'search'}
        placeholder='Место, адрес..'
        onChange={e => setSearchValue(e.target.value)}
      />
      <h3 className={styles.panel__title}>
        {mode === 'landmark' && (
          <img src={ArrowLeft} className={styles.panel__back} alt='arrow-left' onClick={goBack} />
        )}{' '}
        {mode === 'search' ? 'Искать:' : 'Избранное:'}
      </h3>
      {mode === 'saved' && (
        <ul className={styles.panel__cards}>
          {filteredPlaces.map((card, index) => (
            <li key={`card-${index}`}>
              <Card
                title={card.title}
                description={card.description}
                image={card.image}
                goToDetails={goToDetails}
              />
            </li>
          ))}
        </ul>
      )}
      <button
        className={`
          ${styles.panel__closeBtn} 
          ${!isOpen && styles['panel__closeBtn--hidden']} 
          ${mode === 'landmark' && isOpen && styles['panel__closeBtn--expanded']}
        `}
        onClick={closePanel}
      >
        <img src={ArrowLeft} alt='close-arrow-left' />
      </button>
      {mode === 'search' && <SearchPanel categories={MAP_OBJECTS} />}
      {mode === 'landmark' && <Details title={title} description={description} image={image} />}
    </div>
  );
};
