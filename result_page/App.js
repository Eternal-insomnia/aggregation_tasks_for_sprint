import './App.css';

import axios from 'axios';

import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Form, Input, Popconfirm, Table } from 'antd';

import emailjs from "emailjs-com";

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
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
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
const App = () => {

  //email input

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

  const [dataSource, setDataSource] = useState([
    {
      key: '0',
      taskName: 'Накидать страницу по красивому рисунку',
      priority: '5',
      empName: 'Валерчик',
      empSpec: 'UI/UX-разработчик',
    },
    {
      key: '1',
      taskName: 'Накидать функционал к странице по красивому рисунку',
      priority: '4',
      empName: 'Серёга',
      empSpec: 'Backend-разработчик',
    },
  ]);
  const [count, setCount] = useState(2);
  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };
  const defaultColumns = [
    {
      title: 'Задача',
      dataIndex: 'taskName',
      width: '30%',
      editable: true,
    },
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
      title: 'Удалить',
      dataIndex: 'operationDel',
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm title="Точно удалить?" onConfirm={() => handleDelete(record.key)}>
            <a>Удалить</a>
          </Popconfirm>
        ) : null,
    },
  ];
  const handleAdd = () => {
    const newData = {
      key: count,
      taskName: `Задание ${count}`,
      priority: '1',
      empName: `Сотрудник ${count}`,
      empSpec: 'Крутой',
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };
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
  return (
    <div>
      <h1 align="center">Ваш сгенерированный спринт</h1>
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
        <form ref={form} onSubmit={sendEmail}>
          {/* const имя нашей конторы */}
          <input type="hidden" name="from_name" value="БончХакерсГрупп"/>
          <label>Имя получателя</label>
          {/* ФИО сотрудника */}
          <input type="text" name="to_name" />
          <label>Email</label>
          {/* электронная почта сотрудника */}
          <input type="email" name="user_email" />
          <label>Сообщение</label>
          {/* сюда прикреплять ТОЛЬКО ССЫЛКУ НА СПРИНТ, остальное готово уже в шаблоне */}
          <input type="text" name="message" />
          <br></br>
          <Button type='primary' htmlType='submit'>
            Отправить информацию о спринте всем участникам
          </Button>
        </form>
      </div>
    </div>
  );
};
export default App;