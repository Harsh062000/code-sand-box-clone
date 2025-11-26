import { Button, Layout } from 'antd';

import { useCreateProject } from '../hooks/apis/mutations/useCreateProject'

const layoutStyle = {
    borderRadius: 8,
    overflow: 'hidden',
    width: 'calc(50% - 8px)',
    maxWidth: 'calc(50% - 8px',
}

const headerStyle = {
    textAlign: 'center',
    color: '#fff',
    height: 64,
    paddingInline: 48,
    lineHeight: '64px',
    backgroundColor: '#4096ff',
};

const contentStyle = {
    textAlign: 'center',
    minHeight: 120,
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#0958d9',
};

const footerStyle = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#4096ff',
};

function CreateProject() {

    const {Header, Footer, Content} = Layout;

    const {createProjectMutation, isPending } = useCreateProject();

    async function handleCreateProject() {
        console.log("going to trigger the create API");

        try {
            await createProjectMutation();

             console.log("now we should redirect to the project editor page");
        } catch (error) {
            console.log("error creating project:", error);
        }
    }

  return (
    <>
        <Layout style={layoutStyle}>
            <Header style={headerStyle}>Header</Header>
            <Content style={contentStyle}>
                <Button
                    onClick={handleCreateProject}
                >
                    Create Playground
                </Button>
            </Content>

            <Footer style={footerStyle}>Footer</Footer>
        </Layout>
    </>

  )
}

export default CreateProject