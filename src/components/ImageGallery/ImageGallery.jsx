import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import './ImageGallery.css';

import { Button } from '..';
import { LoaderComponent } from '..';

import { PixabayApi } from '../../services';

const pixabayApi = new PixabayApi();

// state machine
const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export function ImageGallery({ searchQuery }) {
  const [status, setStatus] = useState(Status.PENDING);

  switch (status) {
    case 'idle':
      return null;
    case 'pending':
      return (
        <div className="LoaderWrap">
          <LoaderComponent />
        </div>
      );

    default:
      return;
  }
}
