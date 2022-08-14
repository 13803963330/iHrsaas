import PageTools from "@/components/PageTools"
import UploadExcel from "@/components/UploadExcel"
const component=[PageTools,UploadExcel]
export default{
    install(Vue){
        component.forEach((component)=>{
            Vue.component(component.name,component)
        })
    }
}