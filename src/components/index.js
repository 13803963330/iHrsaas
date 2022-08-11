import PageTools from "@/components/PageTools"
const component=[PageTools]
export default{
    install(Vue){
        component.forEach((component)=>{
            Vue.component(component.name,component)
        })
    }
}