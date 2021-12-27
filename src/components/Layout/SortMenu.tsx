import { VFC } from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  MenuOptionGroup,
  Button,
} from '@chakra-ui/react';
import { FcGenericSortingDesc } from 'react-icons/fc';

type Props = {
  onPush: (value: string) => void;
  currentSortType: string;
};

const SortMap: { [key: string]: string } = {
  new: '新着順',
  higher: '価格が高い順',
  lower: '価格が安い順',
  rate: '評価が高い順',
};

export const SortMenu: VFC<Props> = ({ onPush, currentSortType }) => {
  const onChange = (value: string | string[]) => {
    if (typeof value !== 'string') return;
    onPush(value);
  };
  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<FcGenericSortingDesc />}
        color="gray.600"
        bg="white"
        shadow="lg"
        borderRadius="lg"
      >
        {SortMap[currentSortType]}
      </MenuButton>
      <MenuList>
        <MenuOptionGroup defaultValue={currentSortType} title="表示順" type="radio" onChange={onChange}>
          {Object.keys(SortMap).map((key, i) => {
            return (
              <MenuItemOption value={key} key={i}>
                {SortMap[key]}
              </MenuItemOption>
            );
          })}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};
