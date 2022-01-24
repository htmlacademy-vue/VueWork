import Notifier from '@/plugins/notifier';

export default function(store) {
  store.$notifier = new Notifier(store);
}
