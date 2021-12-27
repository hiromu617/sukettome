import { VFC } from 'react';
import {
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from '@chakra-ui/react';
import Link from 'next/link';
import { ChevronRightIcon } from '@chakra-ui/icons';

type Props = {
  lists: { name: string; href?: string; isCurrentPage?: boolean }[];
};

export const BreadcrumbNav: VFC<Props> = ({ lists }) => {
  return (
    <Flex w="full" mb={4}>
      <Breadcrumb separator={<ChevronRightIcon color="gray.500" />}>
        {lists.map((item, i) => {
          return (
            <BreadcrumbItem isCurrentPage={item.isCurrentPage} key={i}>
              <Link href={item.href ? item.href : '#'} passHref>
                <BreadcrumbLink>{item.name}</BreadcrumbLink>
              </Link>
            </BreadcrumbItem>
          );
        })}
      </Breadcrumb>
    </Flex>
  );
};
