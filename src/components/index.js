import PageTools from "@/components/PageTools"
import UploadExcel from "@/components/UploadExcel"
import UploadImg from "@/components/UploadImg"
const component=[PageTools,UploadExcel,UploadImg]
export default{
    install(Vue){
        component.forEach((component)=>{
            Vue.component(component.name,component)
        })
    }
}