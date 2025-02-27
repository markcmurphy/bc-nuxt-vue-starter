import axios from 'axios';
import { API_URL } from '~/config/constants';
import { getSeo, setSeo } from '~/utils/storage';

export const state = () => ({
  seo: {}
});

export const getters = {
  seo(state) {
    return state.seo;
  }
};

export const mutations = {
  SET_SEO(state, seo) {
    state.seo = seo;
  }
};

export const actions = {
  async getStorefrontSeo({ commit }) {
    try {
      const seo = getSeo();
      if (seo) {
        commit('SET_SEO', seo);
      } else {
        const {
          data: { data }
        } = await axios.get(`${API_URL}/storefront?field=seo`);
        commit('SET_SEO', data);
        setSeo(data);
      }
    } catch (error) {
      console.log(error);
    }
  },
  async getStorefrontStatus() {
    try {
      const { data } = await axios.get(`${API_URL}/storefront?field=status`);
      return data;
    } catch (error) {
      return null;
    }
  }
};
