import React, { useRef, useEffect } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Icon, InlineIcon } from '@iconify/react';
import stripeIcon from '@iconify/icons-logos/stripe';
import mastercardIcon from '@iconify/icons-logos/mastercard';
import visaIcon from '@iconify/icons-logos/visa';
import ccPaypal from '@iconify/icons-fa-brands/cc-paypal';

import {
  showErrorMessage,
  showSuccessMessage,
  closeMessage,
} from '../../state/actions/notificationActions';
import {
  handleStripePayment,
  handlePaypalPayment,
  saveDate,
  bookAppointment,
} from '../../state/actions/bookingActions';
import DatePicker from './DatePicker';
import Select from '../Inputs/SelectInfo';
import Notification from '../Notifications/Notification';

const StyledBooking = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
`;

const Booking = props => {
  const {
    date,
    coach,
    closeMessage,
    success,
    error,
    showErrorMessage,
    showSuccessMessage,
    handleStripePayment,
    handlePaypalPayment,
    saveDate,
    select,
    bookAppointment,
    user,
  } = props;

  const paypalRef = useRef();

  useEffect(() => {
    handlePaypalPayment(
      `${coach.first_name} ${coach.last_name}`,
      coach.hourly_rate,
      paypalRef,
      showSuccessMessage,
      showErrorMessage,
      bookAppointment,
      coach,
      user,
      date,
      select.topic_id,
      select.length_id,
      props,
    );
  }, [
    bookAppointment,
    coach,
    date,
    handlePaypalPayment,
    props,
    select.length_id,
    select.topic_id,
    showErrorMessage,
    showSuccessMessage,
    user,
  ]);
  return (
    <StyledBooking>
      <Notification
        onClose={closeMessage}
        variant='success'
        message='Your payment was successful!'
        open={success}
      />
      <Notification
        onClose={closeMessage}
        variant='error'
        message={`Your payment wasn't successful!`}
        open={error}
      />
      <Select />
      {Object.keys(select).length > 1 &&
      date.slice(16, 24) !== '00:00:00' ? (
        <div>
          <DatePicker date={date} saveDate={saveDate} />

          <div>
            <div ref={paypalRef} />
          </div>
          <div>
            <StripeCheckout
              stripeKey='pk_test_Grqfk8uqKNCJYpAQS2t89UB700wHJklrMa' // this key is only for testing we
              // will add later our real key to the env file
              token={token =>
                handleStripePayment(
                  token,
                  `${coach.first_name} ${coach.last_name}`,
                  coach.hourly_rate,
                  showSuccessMessage,
                  showErrorMessage,
                  bookAppointment,
                  coach,
                  user,
                  date,
                  select.topic_id,
                  select.length_id,
                  props,
                )
              }
              amount={coach.hourly_rate * 100}
              name={'stripe'}
              billingAddress
              shippingAddress
            />
          </div>
          <div style={{ marginTop: '60px' }}>
            WE ACCEPT <Icon icon={visaIcon} />{' '}
            <Icon icon={mastercardIcon} /> <Icon icon={ccPaypal} />{' '}
            <Icon icon={stripeIcon} />
          </div>
        </div>
      ) : null}
    </StyledBooking>
  );
};

const mapStateToProps = state => {
  return {
    coach: state.bookingReducer.coach,
    select: state.bookingReducer.select,
    date: state.bookingReducer.date,
    success: state.notificationsReducer.success,
    error: state.notificationsReducer.error,
    user: state.userReducer.user,
  };
};

export default connect(mapStateToProps, {
  handleStripePayment,
  showErrorMessage,
  showSuccessMessage,
  closeMessage,
  handlePaypalPayment,
  saveDate,
  bookAppointment,
})(Booking);
