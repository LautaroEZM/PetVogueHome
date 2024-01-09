import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getServiceDetail, resetDetailService } from "../../redux/actions"

const DetailService = () => {
    const serviceDetails = useSelector((state) => state.detailServices);
    const { serviceID } = useParams();
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(getServiceDetail(serviceID));
      return () => {
        dispatch(resetDetailService());
      };
    }, [serviceID, dispatch]);//ver si saco el dispatch
 
    if (!serviceDetails || Object.keys(serviceDetails).length === 0) {
        return (
          <div>
            <p>Service not found</p>
          </div>
        );
      }
 
    return(
      <div>
        {/* Renderiza los detalles del servicio aquí */}
      </div>
    )
 };
 export default DetailService;