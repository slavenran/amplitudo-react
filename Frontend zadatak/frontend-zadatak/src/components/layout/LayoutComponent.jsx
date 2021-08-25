import React from 'react';
import Layout from 'antd/lib/layout';
import style from './Layout.module.scss';
import HeaderComponent from '../header/HeaderComponent';
import SiderComponent from '../sider/SiderComponent';
import ContentComponent from '../content/ContentComponent';

const { Header, Sider, Content } = Layout;

const LayoutComponent = () => {
    return <Layout className={style.layoutStyle}>
        <Sider
            className={style.siderStyle}
            breakpoint="lg"
            collapsedWidth="0"
        >
            <SiderComponent />
        </Sider>
        <Layout>
            <Header className={style.headerStyle}>
                <HeaderComponent />
            </Header>
            <Content className={style.contentStyle}>
                <ContentComponent />
            </Content>
        </Layout>
    </Layout>
}

export default LayoutComponent;