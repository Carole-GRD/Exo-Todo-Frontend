import List from '../Components/list';
import style from './page-list.module.css'; 

const PageList = () => {
    return (
        <div className={style.page}>
            <h1 className={style.title}>Ma todo liste</h1>
            <List />
        </div>
    )
};

export default PageList;