import { useEffect, useState } from 'react'
import axios from 'axios'
import { css } from '@emotion/react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext';
import { Button, Group } from '@mantine/core';
import moment from 'moment';


const AddContestConfirm = () => {

  const Styles = {
    LogoStyle: css ({
      fontSize: '18px',
      fontWeight: 'bold',
      textAlign: 'center',
      minHeight: '40px',
      marginBottom: '30px',
    }),
    ContainerStyle: css ({
      maxWidth: '1020px',
      width: '90%',
      height: '84vh',
      marginLeft: 'auto',
      marginRight: 'auto',
    }),
    ButtonStyles: css({
      margin: '30px 0',
      justifyContent: 'center',
    }),
    TableTitleStyle: css ({
      fontSize: '16px',
      fontWeight: 'bold',
      textAlign: 'center',
      minHeight: '40px',
    }),
    TableBoxStyle: css ({
      display: 'flex',
      justifyContent: 'center',
      height: '30em',
      padding: '30px',
      border: '1px solid',
      borderRadius: '5px',
      borderColor: '#ADB5BD',

    }),
    TableDataStyle: css ({
      borderBottom: '1px solid',
      borderColor: '#ADB5BD',
    }),
  };

  // const { user } = UserAuth();
  const { user } =  UserAuth() as { user: object };

  const navigate = useNavigate();

  const location = useLocation();
  const { state } = location;

  const initialObject = { title:"", description:"", start_date: new Date(), end_date: new Date(), department:"", entry_conditions:"", result_date: new Date()};

  // const [formDataObject, setFormDataObject] = useState({});
  const [formDataObject, setFormDataObject] = useState(initialObject);

  useEffect(() => {
    setFormDataObject(state.formData)
  },[location])

    if (formDataObject) {
      console.log(formDataObject.title);
      console.log(formDataObject.description);
      console.log(formDataObject.start_date);
      console.log(formDataObject.end_date);
      console.log(formDataObject.department);
      console.log(formDataObject.entry_conditions);
    }

  const start_date = moment(formDataObject.start_date).format('YYYY年MM月D日');
  const end_date = moment(formDataObject.end_date).format('YYYY年MM月D日');

  const endDate = new Date(formDataObject.end_date);
  const result_date = new Date(endDate);
  result_date.setDate(endDate.getDate() + 3);

  console.log(result_date)

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('contest[title]', formDataObject.title);
    formData.append('contest[description]', formDataObject.description);
    formData.append('contest[start_date]', formDataObject.start_date.toISOString());
    formData.append('contest[end_date]', formDataObject.end_date.toISOString());
    formData.append('contest[department]', formDataObject.department);
    formData.append('contest[entry_conditions]', formDataObject.entry_conditions);
    formData.append('contest[result_date]', result_date.toISOString());
    // const formObject = {};
    const formObject: Record<string, any> = {};
    // for (var pair of formData.entries()) {
    for (let pair of formData.entries()) {
    formObject[pair[0]] = pair[1];
    }
    console.log(formObject);

    try {
      const token = await user.getIdToken(true);
      console.log(token)
      const config = { headers: { 'Authorization': `Bearer ${token}` } };

      await axios.post("http://localhost:3000/api/v1/contests", formData, config);
      navigate('/')
    } catch (error) {
      console.log('エラー:', error);
      console.log('エラーコード:', error.code);
      console.log('エラーメッセージ:', error.message);
      alert('エラーが発生しました: ' + error.message);
    }
  };

  return (
    <div css={Styles.ContainerStyle}>
        <h1 css={Styles.LogoStyle}>コンテストを開催する</h1>
        <div className=''>
          <h3 css={Styles.TableTitleStyle}>応募事項</h3>
          <div css={Styles.TableBoxStyle}>
            <table className='min-w-full'>
              <tbody>
                <tr css={Styles.TableDataStyle}>
                  <td className='indent-10'>タイトル</td>
                  <td className='indent-20'>{formDataObject.title}</td>
                </tr>
                <tr css={Styles.TableDataStyle}>
                  <td className='indent-10'>開催内容</td>
                  <td className='indent-20'>{formDataObject.description}</td>
                </tr>
                <tr css={Styles.TableDataStyle}>
                  <td className='indent-10'>応募期間</td>
                  <td className='indent-20'>{`${start_date} 〜 ${end_date}`}</td>
                </tr>
                <tr css={Styles.TableDataStyle}>
                  <td className='indent-10'>開催部門</td>
                  {/* <td className='indent-20'>{formDataObject.departmentLabel}</td> */}
                  <td className='indent-20'>{formDataObject.department}</td>
                </tr>
                <tr>
                  <td className='indent-10'>応募条件</td>
                  <td className='indent-20'>{formDataObject.entry_conditions}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <Group css={Styles.ButtonStyles}>
            <Link to='/contest/new'>
            <Button
                className='mx-20'
                variant="outline"
                color="rgba(59, 59, 59, 1)"
              >
                修正する
              </Button>
            </Link>
            <Button className='mx-20'
              onClick={handleSubmit}
              variant="outline"
              color="rgba(59, 59, 59, 1)"
            >
              開催する
            </Button>
          </Group>
        </div>
    </div>
  )
}

export default AddContestConfirm