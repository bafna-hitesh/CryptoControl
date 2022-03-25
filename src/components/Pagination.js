import { Button } from 'antd';
import React from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.floor(totalPosts / postsPerPage); i += 1) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      <ul className="page">
        <li className="page__btn"><LeftOutlined /></li>
        {pageNumbers.map((number) => (
          <Button ghost="true" className="page__numbers__btn" onClick={() => paginate(number)}>
            {number}
          </Button>
        ))}
        <li className="page__btn"><RightOutlined /></li>

      </ul>
    </div>
  );
};

export default Pagination;
