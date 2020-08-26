import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

console.log(Pagination);

const container = document.getElementById('tui-pagination-container');

const myPagination = new Pagination(container, {
  // Total number of items
  totalItems: 500,
  // Items per page
  itemsPerPage: 20,
  // Visible pages
  visiblePages: 5,
  // Current page
  page: 1,
  // center aligned
  centerAlign: true,
  // default classes
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  // enable usage statistics
  usageStatistics: true,
  //test
  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage:
      '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  },
});

myPagination.getCurrentPage();
