import List from '../Components/list';
import style from './page-list.module.css'; 

const PageList = () => {
    return (
        <>
            <h1 className={style.title}>Ma todo liste</h1>
            <List />
        </>
    )
};

export default PageList;