import Layout from '@/layout'
export default {
  path: '/import',
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/import'),
    }
  ]
}