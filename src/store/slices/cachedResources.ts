import type { AnyObject }       from 'interfaces';
import {
  createSlice,
  createAsyncThunk,
}                               from '@reduxjs/toolkit';
import {
  type ResourcesNames,
  RESOURCES,
}                               from 'api/endpoints/main';
import API                      from 'api';

type CachedResourcesData = {
  [key in ResourcesNames]: AnyObject | any[]
}

type CachedResourcesState = {
  data: null | CachedResourcesData;
}

type CachedResources = Record<ResourcesNames, CachedResourcesState>;

// -------------------------------------------------------------------

const initialState: CachedResources = Object.keys(RESOURCES).reduce((prev, cur) => {
  const _prev = { ...prev };

  _prev[cur] = { data: null };

  return _prev;
}, {} as CachedResources);

// -------------------------------------------------------------------

type TFetchResource = {
  resourceName: ResourcesNames,
  query?: AnyObject,
};

const fetchResource = async ({
  resourceName,
  query = {},
}: TFetchResource): Promise<any> => {
  return (
    await API[resourceName].get({ ...query })
    .then(res => res?.data || res)
    .catch(() => {
      throw new Error(`${resourceName} fetch failed`);
    })
  );
};

export const fetchResourceThunk = createAsyncThunk(
  'cachedResources/fetch',
  fetchResource
);

// -------------------------------------------------------------------

const cachedResourcesSlice = createSlice({
  name: 'cachedResources',
  initialState,
  reducers: {
    resetStaticLibs: (state) => {
      // eslint-disable-next-line
      state = initialState;
    },
    setLibData: (state, action) => {
      const { name, data } = action.payload;

      // eslint-disable-next-line
      state[name].data = data;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchResourceThunk.fulfilled, (state, { meta, payload }) => {
      const cachedResource = state[meta.arg.resourceName];

      cachedResource.data = payload;
    });
  },
});

export { fetchResource };

export const { resetStaticLibs, setLibData } = cachedResourcesSlice.actions;

export default cachedResourcesSlice.reducer;