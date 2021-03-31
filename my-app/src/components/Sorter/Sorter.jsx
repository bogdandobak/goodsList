import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import uniqid from 'uniqid';
import { ProductsList } from '../ProductsList';
import './Sorter.scss';

const linksData = [
  { sortedBy: 'name', id: uniqid(), title: 'Sorted by name' },
  { sortedBy: 'count', id: uniqid(), title: 'Sorted by count' },
];

export const Sorter = () => (
  <ul className="sorters">
    {linksData.map((sort) => (
      <li key={sort.id}>
        <NavLink
          to={ProductsList.link({ sortedBy: sort.sortedBy })}
        >
          <Button>
            {sort.title}
          </Button>
        </NavLink>
      </li>
    ))}
  </ul>
);
