import { runSaga } from 'redux-saga';
import MockAdapter from 'axios-mock-adapter';
import api from '~/services/api';

import {
  getTechsSuccess,
  getTechsFailure,
} from '~/store/modules/techs/actions';
import { getTechs } from '~/store/modules/techs/saga';

const apiMock = new MockAdapter(api);

describe('Techs saga', () => {
  it('shpuld be abble to fetch techs', async () => {
    const dispatch = jest.fn();

    apiMock.onGet('techs').reply(200, ['Node.js']);

    await runSaga({ dispatch }, getTechs).toPromise();

    expect(dispatch).toHaveBeenCalledWith(getTechsSuccess(['Node.js']));
  });

  it('shpuld fail when the api returns an error', async () => {
    const dispatch = jest.fn();

    apiMock.onGet('techs').reply(500);

    await runSaga({ dispatch }, getTechs).toPromise();

    expect(dispatch).toHaveBeenCalledWith(getTechsFailure());
  });
});
