export const topicPrimaryStyle = (theme) => (
    {
        root: {
            display: 'flex',
            alignItems: 'center'
        },
        title: {
            color: '#555'
        },
        tab: {
            backgroundColor: theme.palette.primary.main,
            textAlign: 'center',
            display: 'inline-block',
            padding: '0 6px',
            color: '#fff',
            borderRadius: 3,
            marginRight: 10,
            fontSize: '12px'
        },
        top: {
            backgroundColor: theme.palette.secondary.main
        }
    }
)

export const topicScondaryStyle = (theme) => (
    {
        root: {
            display: 'flex',
            alignItems: 'center',
            paddingTop: 3
        },
        count: {
            textAlign: 'center',
            marginRight: 20
        },
        userName: {
            marginRight: 20,
            color: '#9e9e9e'
        },
        reply: {
            color: theme.palette.secondary.main
        }
    }
)

export default topicPrimaryStyle
