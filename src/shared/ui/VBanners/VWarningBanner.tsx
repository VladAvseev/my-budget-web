import { Banner, type BannerProps } from './Banner';

export const VWarningBanner = ({ visible, message, onClose }: BannerProps) => (
  <Banner type="warning" visible={visible} message={message} onClose={onClose} />
);