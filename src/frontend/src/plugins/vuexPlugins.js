import JWTService from '@/services/jwt.service';
import Notifier from '@/plugins/notifier';
import { createResources } from '@/common/helpers';

export default function(store) {
  store.$jwt = JWTService;
  store.$notifier = new Notifier(store);
  store.$api = createResources(store.$notifier);
}
