import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// Data
import { githubUsername, projectCardImages } from "../data";

const initialState = {
  error: "",
  isLoading: true,
  data: [],
};

export const url = `https://api.github.com/users/${githubUsername}/repos?per_page=100`;

export const fetchGitHubReops = createAsyncThunk(
  "allProjects/fetchGitHubReops",
  async (thunkApi, { rejectWithValue }) => {
    try {
      const response = await fetch(url).then(function (res) {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res;
      });
      const data = await response.json();
      return data;
    } catch (err) {
      return rejectWithValue(
        `Error: ${err.message}, check username in data.js (currently ${githubUsername})`
      );
    }
  }
);

export const allProjectsSlice = createSlice({
  name: "allProjects",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchGitHubReops.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(fetchGitHubReops.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        projectCardImages.forEach(function (element) {
          state.data.forEach((el, i) => {
            if (element.name.toLowerCase() === el.name.toLowerCase()) {
              el.image = element.image;
            }
          });
        });
      })
      .addCase(fetchGitHubReops.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        console.log(state.error);
      });
  },
});

export const selectIsLoading = (state) => state.allProjects.isLoading;
export const selectError = (state) => state.allProjects.error;
export const selectData = () => [
  {
    id: 1,
    name: 'bin2dec',
    image: 'https://m.media-amazon.com/images/I/51Sd5dfHqiL.png',
    description: 'Conversor de números binarios para decimais dinamicamente',
    html_url: 'https://vinny021.github.io/bin2dec-build/'
  },
  {
    id: 2,
    name: 'border-radius-previewer',
    image: 'https://cdn.dribbble.com/users/2044753/screenshots/5385836/media/1dc83d9753656435a17d1c6559c0df40.png?compress=1&resize=400x300',
    description: 'Visualizador de borda arredondada com inputs dinâmicos',
    html_url: 'https://vinny021.github.io/border-radius-previewer/'
  },
  {
    id: 3,
    name: 'csv2json',
    image: 'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/107182241/original/fb38683156fe42fbf4881dfd4f93bc72a81819b1/convert-json-files-to-csv-or-csv-to-json.png',
    description: 'Conversor de Csv para Json',
    html_url: 'https://vinny021.github.io/csv2json/'
  },
  {
    id: 4,
    name: 'calculator',
    image: 'https://vectips.com/wp-content/uploads/2019/06/tutorial-preview-large.png',
    description: 'Calculadora Web Funcional',
    html_url: 'https://vinny021.github.io/calculator/'
  }
];

export default allProjectsSlice.reducer;
