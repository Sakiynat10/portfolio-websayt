import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import request from "../../server/request"
import { LIMIT } from "../../components/cosnt";

const initialState = {
    loading:false , 
    skills:null,
    total:0,
    selected:null,
    btnLoading:false,
    isOpen:false,
    callback:false,
    search: "",
}

export const getSkills = createAsyncThunk('skill' , async (  params, {getState}) => {
    const {page } = getState().skill;
    const {search} = getState().skill
    params = { ...params,page ,search ,  limit: LIMIT}
    const {data} = await request('skills' , {params})
    return data
})




const skillSlice = createSlice({
    initialState,
    name: 'skill' ,
    reducers: {
        controlModal(state) {
            state.isOpen = !state.isOpen
        },
        changePage(state , {payload}){
            state.page = payload
        },
        controlBtnLoading(state) {
            state.btnLoading = !state.btnLoading
        },
        refetch(state){
            state.callback = !state.callback
        },
        setSelected(state , {payload}) {
            state.selected = payload
        },
        handleSearchSkill(state , {payload}){
            state.search = payload
        }
    } ,
    extraReducers:(builder) => {
        builder
           .addCase(getSkills.pending , (state) => {
            state.loading = true
           })
           .addCase(getSkills.fulfilled , (state , {payload : {data , pagination : {total}}}) => {
            state.loading = false;
            state.skills = data;
            state.total = total
           })
           .addCase(getSkills.rejected , (state) => {
            state.loading = false
           })
    }
})



const {reducer: skillReducer , actions} = skillSlice

export const {controlModal ,controlBtnLoading ,refetch , changePage ,setSelected ,search,total, handleSearchSkill } = actions


export default skillReducer;
