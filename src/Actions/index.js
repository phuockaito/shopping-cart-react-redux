import { message } from 'antd';
import * as actionTypes from 'Constants/actionType';
import API from '../Axios/API';
const key = 'updatable';
//-------------------Start Get Products-------------------

export const GetProducts = product => {
  return {
    type: actionTypes.GET_LIST_PRODUCTS,
    product
  }
};

export const GetProductsRequest = (page) => {
  return dispatch => {
    return API(`products/get-product?page=${page}`, 'GET', null).then(res => {
      dispatch(GetProducts(res.data))
    })

  }
};



//-------------------Sater Get Menu-----------------
export const GetMenu = menu => {
  return {
    type: actionTypes.GET_MENU,
    menu
  }
};

export const GetMenuResult = () => {
  return dispatch => {
    return API('menu', 'GET', null).then(res => {
      dispatch(GetMenu(res));
    })
  }
};

//-------------------Stater Get Banner-----------------

export const GetBanner = banner => {
  return {
    type: actionTypes.GET_BANNER,
    banner
  }
};

export const GetBannerResult = () => {
  return dispatch => {
    return API('banner/get-banner', 'GET', null).then(res => {
      dispatch(GetBanner(res.data));
    })
  }
};


//------------------Start Products Type--------------

export const GetProductsType = key => {
  return {
    type: actionTypes.GET_PRODUCT_TYPE,
    key
  }
};

export const GetProductsTypeRequest = (data) => {
  return dispatch => {
    return API(`products/type?name=${data.name}&page=${data.page}&sort_Price=${data.sort_price}`, 'GET', null).then(res => {
      dispatch(GetProductsType(res.data))
    })
  }
};


//------------------Start Products Type--------------

export const GetProductsSilder = key => {
  return {
    type: actionTypes.GET_SILDERS,
    key,
  }
};

export const GetProductsSilderRequest = (key) => {
  return dispatch => {
    return API(`products/type?name=${key}`, 'GET', null).then(res => {
      dispatch(GetProductsSilder(res.data))
    })
  }
};

//------------------Start Products NSX----------------

export const GetProductsNSX = NSX => {
  return {
    type: actionTypes.GET_PRODUCT_NSX,
    NSX,
  }
};


export const GetProductsNSXRequest = data => {
  return dispatch => {
    return API(`products/${data.key}/${data.NSX}?page=${data.page}&sort_price=${data.sort_price}`, 'GET', null).then(res => {
      dispatch(GetProductsNSX(res.data))
    })
  }
};

//------------------Start Products ID----------------
export const GetProductsID = id => {
  return {
    type: actionTypes.GET_PRODUCT_ID,
    id,
  }
};

export const GetProductsIDRequest = id => {
  return dispatch => {
    return API(`products/get-one-product?id=${id}`, 'GET', null).then(res => {
      dispatch(GetProductsID(res.data))
    })
  }
};



//------------------Satart Search Products ------------

export const GetSearch = keyword => {
  return {
    type: actionTypes.SEARCH_PRODUCT,
    keyword
  }
};

export const GetSearchResults = data => {
  return dispatch => {
    return API(`search?keyword=${data.keyword}&page=${data.page}`).then(res => {
      dispatch(GetSearch(res.data));

    })
  }
};



//------------------Start Card Products ----------------
//localStorage
export const addToCart = (product, quantity) => {
  return {
    type: actionTypes.ADD_TO_CART,
    product,
    quantity
  }
};

export const deleteToCart = product => {
  return {
    type: actionTypes.DELETE_CART,
    product
  }
};

export const updateQuantity = (index, quantity) => {
  return {
    type: actionTypes.UPDATA_CART,
    index,
    quantity
  }
};
// API
export const addToCartApi = cart => {
  return {
    type: actionTypes.ADD_CART_API,
    cart,
  }
}

export const addToCartRequestAPI = data => {
  return dispatch => {
    return API('cart/add-cart', 'POST', data.inforCart, data.token).then(res => {
      dispatch(addToCartApi(res.data));
    }).catch(err => {
      console.log(err);
    })
  }
}

export const updataCartAddresses = data_uptata => {
  return {
    type: actionTypes.UPDATA_CART_ADDRESS,
    data_uptata
  }
}

export const updataCartAddressesAPI = data => {
  return dispatch => {
    return API(`cart/update-address?id_card=${data.id_card}`, 'PUT', data.inforCart, data.token).then(res => {
      console.log(res)
      dispatch(updataCartAddresses(res.data))
    }).catch(err => console.log('err', err));
  }
}



export const historyCart = cart => {
  return {
    type: actionTypes.HISTORY_CART,
    cart
  }
};

export const historyCartAPI = token => {
  return dispatch => {
    return API('cart/get-cart', 'GET', null, token).then(res => {
      dispatch(historyCart(res.data))
    })
  }
};

export const updataCartStatusOrder = data_order_status => {
  return {
    type: actionTypes.UPDATA_CART_STATUS_CARD,
    data_order_status
  }
};

export const updataCartStatusOrderAPI = data => {
  return dispatch => {
    return API(`cart/update-status-order?id_card=${data.id_card}`, 'PUT', data.data_card, data.token).then(res => {
      dispatch(updataCartStatusOrder(res.data))
    })
  }
}


// ------------------Start Register-----------------
export const registerRegister = userRegister => {
  return {
    type: actionTypes.REGISTER_USER,
    userRegister
  }
};

export const registerRegisterAPI = user => {
  return dispatch => {
    return API('user/register', 'POST', user).then(res => {
      dispatch(registerRegister(res.data));
    }).catch(err => {
      message.loading({ content: 'Đang xử lý...', key });
      setTimeout(() => {
        message.error({ content: 'Tài khoản này đã tồn tại !', key, duration: 2 });
      }, 1000);
    })
  }
};

// ------------------Start Login-----------------
export const loginUserRequest = userLogin => {
  return {
    type: actionTypes.LOGIN_USER,
    userLogin
  }
};

export const loginUserRequestAPI = user => {
  return dispatch => {
    return API('user/login', 'POST', user).then(res => {
      dispatch(loginUserRequest(res.data));
    }).catch(err => {
      message.loading({ content: 'Đang xử lý...', key });
      setTimeout(() => {
        message.error({ content: 'Tài khoản hoặc mật khẩu không đúng!', key, duration: 2 });
      }, 1000);
    })
  }
};

// ------------------Start Information user-----------------

export const informationUserRequest = data => {
  return {
    type: actionTypes.INFORMATION_USER,
    data,
  }
}
export const informationUserRequestAPI = token => {
  return dispatch => {
    return API('user/profile', 'GET', null, token).then(res => {
      dispatch(informationUserRequest(res.data));
    }).catch(err => {
      console.log('err', err);
      localStorage.removeItem('token');
      window.location.reload();
    })
  }
};

export const updataInformationUserRequest = data => {
  return {
    type: actionTypes.UPDATA_USER_INFO,
    data
  }
};

export const updataInformationUserRequestAPI = data => {
  return dispatch => {
    return API('user/updata-informaiton', 'PUT', data.user, data.token).then(res => {
      dispatch(updataInformationUserRequest(res.data));
    }).catch(err => console.log('err', err));
  }
};

export const uploadImageUserRequest = data => {
  return {
    type: actionTypes.UPLOAD_IMAGE_USER,
    data
  }
};

export const uploadImageUserRequestAPI = data => {
  return dispatch => {
    return API('user/updata-image', 'PUT', data.formData, data.token).then(res => {
      dispatch(uploadImageUserRequest(res.data));
    }).catch(err => console.log('err', err));
  }
}

// ------------------Start Get Comment Products-----------------
export const getCommentProducts = comment => {
  return {
    type: actionTypes.GET_COMMENT_PRODUCT,
    comment
  }
};

export const getCommentProductsAPI = data => {
  return dispatch => {
    return API(`comments/get-comments?_id_product=${data.idProduct}&page=${data.page}&limit=${data.limit}`, 'GET', null).then(res => {
      dispatch(getCommentProducts(res.data));
    }).catch(err => {
      console.log('err', err);
    })
  }
};

// ------------------Start Post Comment Products-----------------
export const postCommentProducts = dataComment => {
  return {
    type: actionTypes.POST_COMMENT_PRODUCT,
    dataComment
  }
};

export const postCommentProductsAPI = comment => {
  return dispatch => {
    return API(`comments/create-commnet`, 'POST', comment.data, comment.token).then(res => {
      dispatch(postCommentProducts(res.data));
    }).catch(err => {
      console.log('error', err);
    })
  }
}

export const deleteCommentProducts = deleteComment => {
  return {
    type: actionTypes.DELETE_COMMENT_PRODUCT,
    deleteComment
  }
}

export const deleteCommentProductsAPI = comment => {
  return dispatch => {
    return API(`comments/delete-comments?id=${comment._id}&_id_product=${comment._id_product}`, 'DELETE', null, comment.token).then(res => {
      dispatch(deleteCommentProducts(res.data));
    }).catch(err => {
      console.log('err', err);
    })
  }
}

export const historyComments = comment => {
  return {
    type: actionTypes.HISTORY_COMMENT,
    comment
  }
}

export const historyCommentsAPI = data => {
  return dispatch => {
    return API(`comments/history-comments?page=${data.page}&iteml=${data.iteml}`, 'GET', null, data.token).then(res => {
      dispatch(historyComments(res.data));
    }).catch(err => console.log('err', err))
  }
}