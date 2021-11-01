/*
 * @Author: AkiraMing
 * @Date: 2021-10-29 20:14:48
 * @LastEditTime: 2021-11-01 11:15:13
 * @LastEditors: AkiraMing
 * @Description: 描述
 * @FilePath: \apricotAntdPro\src\apricot\modules\base\components\AvatarUpload\index.tsx
 */
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import React from 'react';
import baseServices from '@/apricot/modules/base/service';

// function getBase64(
//   img: Blob,
//   callback: { (imageUrl: any): void; (arg0: string | ArrayBuffer | null): any },
// ) {
//   const reader = new FileReader();
//   reader.addEventListener('load', () => callback(reader.result));
//   reader.readAsDataURL(img);
// }

function beforeUpload(file: { type: string; size: number }) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('您只能上传JPG/PNG文件！');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('图像必须小于2MB！');
  }
  return isJpgOrPng && isLt2M;
}

interface Porps {
  initImgUrl?: string;
  getImgUrl?: (imgUrl: string) => void;
}
class AvatarUpload extends React.Component {
  props: Porps = this.props;

  state = {
    loading: false,
  };

  handleChange: any = (info: { file: { status: string; originFileObj: any } }) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      // getBase64(info.file.originFileObj, (imageUrl: any) =>
      this.setState({
        // imageUrl,
        loading: false,
      });
      // );
    }
  };

  render() {
    const { loading, imageUrl }: any = this.state;
    const { initImgUrl, getImgUrl }: any = this.props;
    // if (initImgUrl) this.setState({ imageUrl: initImgUrl });
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    console.log(window.location.host);

    return (
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action={async (file) => {
          const data = new FormData();
          data.append('key', `app/${file.name}`);
          data.append('file', file);
          const imgInfo = (await baseServices.common.upload(data)) as any;
          if (!imgInfo.success) return message.error('上传失败');
          this.setState({ imageUrl: imgInfo.data });
          // 将图片地址传回父组件
          getImgUrl(imgInfo.data);
          return imgInfo.data;
        }}
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {imageUrl || initImgUrl ? (
          <img src={imageUrl || initImgUrl} alt="avatar" style={{ width: '100%' }} />
        ) : (
          uploadButton
        )}
      </Upload>
    );
  }
}
export default AvatarUpload;
