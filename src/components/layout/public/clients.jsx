import { Fragment, useEffect, useState } from "react";
import request from "../../../server/request";
import { LIMIT } from "../../cosnt";
import ClientCard from "../../cards/client-card/client";
import { Pagination } from "antd";

const ClientsPage = () => {
    const [data , setData] = useState(null);
    const [loading , setLoading] = useState(false)
    const [total , setTotal] = useState(0);
    const [page , setPage] = useState(0);
  useEffect(() => {
    const getStudent = async () => {
        try{
            setLoading(true)
            const params = { page ,limit:LIMIT}
            const {data: {data , pagination}} = await request(`users?role=client` , {params});
            setTotal(pagination?.total)
            console.log(pagination);
            console.log(data);
            setData(data)
        }
        finally{
            setLoading(false)
        }
    }
    getStudent();
    console.log(data?.map((el) => el.photo));
  } , [page])

  const getPage = (page) => {
    setPage(page)
  }
  
  return (
    <Fragment>
        <div className="client-content" style={{paddingTop:80}}>
            {data?.map((client, i) => <ClientCard key={i}  {...client} />)}
        </div>
        <Pagination
        total={total} 
        showSizeChanger={false}
        pageSize={LIMIT}
        onChange={getPage}
      />
    </Fragment>
  )
}

export default ClientsPage