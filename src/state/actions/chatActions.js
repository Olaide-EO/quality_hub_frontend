import axiosWithAuth from '../../utils/axiosWithAuth';

export const GET_ROOMS_ERROR = 'GET_ROOMS_ERROR';
export const GET_ROOMS_SUCCESSFUL = 'GET_ROOMS_SUCCESSFUL';
export const START_CHAT_SUCCESSFUL = 'START_CHAT_SUCCESSFUL';
export const SAVE_PEER = 'SAVE_PEER';
export const SAVE_ROOM_ID = 'SAVE_ROOM_ID';

const url = process.env.REACT_APP_BASE_URL;

export const savePeer = (peer, props) => {
  debugger
  props.history.push('/chat');
  return { type: SAVE_PEER, payload: peer };
};

export const saveRoomId = roomId => {
  return { type: SAVE_ROOM_ID, payload: roomId };
};

export const getRooms = email => dispatch => {
  axiosWithAuth()
    .post(`${url}chat/user_room`, {
      userId: email,
    })
    .then(res => {
      debugger;
      dispatch({
        type: GET_ROOMS_SUCCESSFUL,
        payload: res.data.rooms,
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ROOMS_ERROR,
        payload: err,
      });
    });
};

export const startChat = (id, user, peer, props) => dispatch => {
  axiosWithAuth()
    .post(`${url}chat/room_id`, {
      roomId: id,
    })
    .then(res => {
      debugger
      if (res.data.message === 'successful') {
        props.history.push('/chat');
        dispatch({ type: START_CHAT_SUCCESSFUL });
      } else {
        axiosWithAuth()
          .post(`${url}chat`, {
            username: user.email,
          })
          .then(() => {
            axiosWithAuth()
              .post(`${url}chat`, {
                username: peer.email,
              })
              .then(() => {
                axiosWithAuth()
                  .post(`${url}chat/room`, {
                    creatorId:
                      user.role_id === 1 ? user.email : peer.email,
                    name: id,
                    userIds: [user.email, peer.email],
                    id,
                    customData: {
                      role_id_one:
                        user.role_id === 1
                          ? `${user.first_name} ${user.first_name}`
                          : `${peer.name}`,
                      role_id_one_url:
                        user.role_id === 1
                          ? user.avatar_url
                          : peer.avatar_url,
                      role_id_two:
                        user.role_id === 1
                          ? peer.name
                          : `${user.first_name} ${user.first_name}`,
                      role_id_two_url:
                        user.role_id === 1
                          ? peer.avatar_url
                          : user.avatar_url,
                    },
                  })
                  .then(res => {
                    dispatch({ type: START_CHAT_SUCCESSFUL });
                    props.history.push('/chat');
                  });
              });
          });
      }
    });
};
