import Vue from 'vue';
import {Carousel, CarouselItem, Pagination, MessageBox, DatePicker} from 'element-ui';

Vue.component(Pagination.name, Pagination);
Vue.component(Carousel.name, Carousel);
Vue.component(CarouselItem.name, CarouselItem);
Vue.component(MessageBox.name, MessageBox);
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$alert = MessageBox.alert;

Vue.use(DatePicker);

export default {
};
