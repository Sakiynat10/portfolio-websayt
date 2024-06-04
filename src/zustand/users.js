import { create } from "zustand";
import request from "../server/request";
import { LIMIT } from "../components/cosnt";

const useUsers = create((set, get) => ({
    users:[],
    clients:[],
    total:0,
    page:1,
    change:false,
    loading:false,
    isOpen:false,
    btnLoading:false,
    selected:null,
    getUsers: async () => {
        try{
            const {page} = get();
            const {change} = get();
            const params = {page , limit:LIMIT}
            set({loading:true})
            const {data: {data , pagination}} = await request(`users?role=${change ? "client" : "user"}`, {params});
            console.log(data);
            set({users:data , total:pagination.total})
            // set({clients:data.filter((client)=> client.role.includes("client") ), total:pagination.total})
        }finally{
            set({loading:false})
        }
    },
    
    getPage: (page) => {
        const {getUsers} = get();
        set({page})
        getUsers()
    },
    switchChange: (e) => {
        const {getUsers} = get();
        set({change:e})
        getUsers()
    },
    deleteUser: async (id) => {
        const {getUsers} = get ();
        await request.delete(`users/${id}`)
        getUsers()
    } ,
    submit: async (form) => {
        try{
            const {getUsers , controlModal , selected} = get()
            set({btnLoading:true})
            const values = await form.validateFields();
            if(selected === null){
                await request.post('users' , values);
            }else{
                await request.put(`users/${selected}` , values);
            }
            getUsers()
            controlModal()
        }finally{
            set({btnLoading:false})
        }
    } ,
    editUser: async (form , id) => {
        try{
            set({selected:id , btnLoading:true , isOpen:true})
            const {data} = await request.get(`users/${id}`)
            form.resetFieldsValue(data)
        }finally{
            set({btnLoading:false})
        }
    }
    ,
    controlModal: () => {
        const {isOpen} = get();
        set({isOpen: !isOpen})
    } ,
    showModal: (form) => {
        const {controlModal} = get();
        controlModal();
        form.resetFields();
    }
}))

export default useUsers