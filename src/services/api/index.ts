import axios from 'axios';
const { log } = require('@bloom42/astro');
const store = require('store');
import * as Bitflow from './bitflow';

import vueStore from '@/store';
import router from '@/router';

class API {
  ACCOUNT_GRAPHQL = '/account/graphql';
  // static get DRIVE_GRAPHQL() { return '/drive/graphql' };
  DRIVE_GRAPHQL = '/drive/graphql';
  DRIVE_UPLOAD = '/drive/v1/upload';
  PHASER_GRAPHQL = '/phaser/graphql';
  NOTES_GRAPHQL = '/notes/graphql';
  CONTACTS_GRAPHQL = '/contacts/graphql';
  SESSION_KEY = '__bloom';
  private static get MESSAGE_SESSION_EXPIRED() { return 'session expired'; }

  private _client: any;

  init() {
    this.set_empty_client();

    const session = store.get(this.SESSION_KEY);
    vueStore.commit('set_session', session);
    if (session) {
      this.set_auth_header(vueStore.state.session!.token);
      this.fetch_me();
    }
  }

  async query(route: string, query: string, variables?: any) {
    let res = null;
    try {
      res = await this._client.post(route, {
        operationName: null,
        query,
        variables,
      });
    } catch (err) {
      if (err.response) {
        res = err.response;
      } else {
        throw err;
      }
    }
    if (res && res.data.errors && res.data.errors.length >= 1) {
      const err = res.data.errors[0].message;
      if (err.toString().indexOf(API.MESSAGE_SESSION_EXPIRED) !== -1) {
        // Notification.error({
        //   title: 'Error',
        //   message: SESSION_EXPIRED_ERROR_MESSAGE,
        //   duration: 0,
        // });
        this.end_session();
      }
      log.error(err);
      throw new Error(err);
    } else if (res && res.data.error) {
      const err = res.data.error;
      log.error(err);
      throw new Error(err);
    }
    log.with({ data: res.data.data }).debug();
    return res.data.data;
  }

  async mutate(route: string, mutation: string, variables?: any) {
    let res = null;
    try {
      res = await this._client.post(route, {
        operationName: null,
        query: mutation,
        variables,
      });
    } catch (err) {
      if (err.response) {
        res = err.response;
      } else {
        throw err;
      }
    }
    if (res && res.data.errors && res.data.errors.length >= 1) {
      const err = res.data.errors[0].message;
      if (err.toString().indexOf(API.MESSAGE_SESSION_EXPIRED) !== -1) {
        // Notification.error({
        //   title: 'Error',
        //   message: SESSION_EXPIRED_ERROR_MESSAGE,
        //   duration: 0,
        // });
        this.end_session();
      }
      log.error(err);
      throw new Error(err);
    } else if (res && res.data.error) {
      const err = res.data.error;
      log.error(err);
      throw new Error(err);
    }
    log.with({ data: res.data.data }).debug();
    return res.data.data;
  }

  sign_in(session: any) {
    store.set(this.SESSION_KEY, session);
    vueStore.commit('set_session', session);
    this.set_auth_header(session.token);

    this.fetch_me();
  }

  async sign_out() {
    try {
      await this.mutate(this.ACCOUNT_GRAPHQL, 'mutation { sign_out() }');
    } catch (err) {
      log.error(err);
    } finally {
      this.end_session();
    }
  }

  is_authenticated() {
    return vueStore.state.session !== null && vueStore.state.session !== undefined;
  }

  async fetch_me() {
    try {
      const data = await this.query(this.ACCOUNT_GRAPHQL, `query {
        me {
          avatar
          username
          first_name
          last_name
          email
        }
      }
      `);
      vueStore.commit('set_account', data.me);
    } catch (err) {
      log.error(err);
    }
  }

  client() {
    return this._client;
  }

  private set_empty_client() {
    const api_url = process.env.VUE_APP_API_BASE_URL ?
      process.env.VUE_APP_API_BASE_URL
      : `https://api.${process.env.VUE_APP_ROOT_DOMAIN}`;
    this._client = axios.create({ baseURL: api_url });
    delete this._client.defaults.headers.common.Authorization;
  }

  private set_auth_header(token: string) {
    this._client.defaults.headers.common.Authorization = `Basic ${token}`;
  }

  private end_session() {
    store.remove(this.SESSION_KEY);
    vueStore.commit('set_session', null);
    this.set_empty_client();
    router.push({ path: '/' });
  }
}

export * from './bitflow';
export default new API();
