import './App.css';
import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Form, Input, Popconfirm, Space, Table } from 'antd';
import emailjs from 'emailjs-com';
////////////////////// all table below

const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);
  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };
  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };
  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `"${title}" - обязательное поле.`,
          },
        ]}
      >
        <Input ref={inputRef} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};
let count = 0;
const ThirdPage = () => {
  const [dataSource, setDataSource] = useState('');

  console.log(count);
  if (count < 5) {
        axios.get('http://localhost:8080/api/final')
          .then(res => {
            setDataSource(res.data);
          })
          .catch(err => {
            console.error(err);
            // Добавьте здесь обработку ошибок при выполнении запроса
          });
  //email input
          count = count + 1;
        }

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
    .sendForm(
      'service_rzfel59', //service ID
      'template_qwyxaxr', //template ID
      form.current,
      '8Y0YqBPgciGG_oM_I' //user ID
    )
    .then(
      (result) => {
        console.log(result.text);
        console.log("message sent");
      },
      (error) => {
        console.log(error.text);
      }
    );
  };

  

  /////////////table below
  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const defaultColumns = [
    {
      title: 'Задача',
      dataIndex: 'description',
      width: '30%',
      editable: true,
    },
    // {
    //   title: 'Подробнее',
    //   dataIndex: 'operationDel',
    //   render: (_, record) =>
    //     axios.post('http://localhost:8080/api/gpt',  {gpt: (record.description)})
    //       .then(res => {
    //         const [api, contextHolder] = notification.useNotification();
    //         const openNotification = () => {
    //         api.open({
    //           message: 'ChatGPT',
    //           description:
    //             {res},
    //           duration: 0,
    //         });
    //         }
    //         return (
    //         <>
    //           {contextHolder}
    //           <Button type="default" onClick={openNotification}>
    //             Подробнее
    //           </Button>
    //         </>
    //       )
    //       })
    // },
    {
      title: 'Приоритет',
      dataIndex: 'priority',
      editable: true,
      sorter: (a, b) => a.priority - b.priority,
      width: '10%',
      align: 'center',
    },
    {
      title: 'ФИО Сотрудника',
      dataIndex: 'empName',
      editable: true,
    },
    {
      title: 'Должность/Спецификация',
      dataIndex: 'empSpec',
      editable: true,
      filters: [
        {
          text: 'UI/UX-разработчик',
          value: 'UI/UX-разработчик',
        },
        {
          text: 'Backend-разработчик',
          value: 'Backend-разработчик',
        },
        {
          text: 'Специалист по БД',
          value: 'Специалист по БД',
        },
        {
          text: 'Дизайнер',
          value: 'Дизайнер',
        },
        {
          text: 'Android/iOS разработчик',
          value: 'Android/iOS разработчик',
        },
      ],
      onFilter: (value, record) => record.address.startsWith(value),
      filterSearch: true,
    },
    {
      title: 'Подробнее',
      dataIndex: '',
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm title="Точно удалить?" onConfirm={() => handleDelete(record.key)}>
            <Button type='default'>Удалить</Button>
            
          </Popconfirm>
        ) : null,
    },
  ];
  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });
  const [gpt, setGpt] = useState('');
  const PostRequest = (e) => {
    e.preventDefault()
        axios.post('http://localhost:8080/api/gpt',  {dataSource: dataSource})
          .then(res => {
            setGpt(res.data);
            // Добавьте здесь логику для обработки успешного ответа сервера
          })
          .catch(err => {
            console.error(err);
            // Добавьте здесь обработку ошибок при выполнении запроса
          });
  }

  return (
    <div>
      <h2 className='Header'>Ваш сгенерированный спринт</h2 >
      {/* <Space>
        <Input type='textarea' placeholder='Введите текст' value={gpt} onChange={el => setGpt(el.target.value)}></Input>
        <Button onClick={PostRequest}>Подробнее</Button>
      </Space> */}
      
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns}

        sticky={{
          offsetHeader: 0,
        }}
      />
      <div className='buttonSend'>
        {/* const [name, setName] = setState("БончХакерсГрупп");
        const [fname, setFName] = setState("");
        const [email, setEmail] = setState("");
        const [text, setText] = setState("");
        dataSource.map((el) => {
        setFName({el.empName});
        setEmail({el.email});
        setText({el.description});
        }
        ) */}
        <form ref={form} onSubmit={sendEmail} align='center'>
          <Space>
          {/* const имя нашей конторы */}
          <Input type="hidden" name="from_name" value="БончХакерсГрупп"/>
          {/* ФИО сотрудника */}
          <Input type="text" name="to_name" placeholder='Имя сотрудника'/>
          {/* электронная почта сотрудника */}
          <Input type="email" name="user_email" placeholder='Email сотрудника'/>
          {/* сюда прикреплять ТОЛЬКО ССЫЛКУ НА СПРИНТ, остальное готово уже в шаблоне */}
          <Input type="text" name="message" placeholder='Ссылка на спринт'/>
          </Space>
          <br></br>
          <Button 
            type='primary' 
            htmlType='submit'
            style={{
              marginTop: 30,
            }}
          >
            Отправить информацию о спринте всем участникам
          </Button>
        </form>
      </div>
    </div>
  );
};
export default ThirdPage;