import React, { useEffect, useRef, useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { flatArrayToTree } from "@/helpers/TreeHelpers";
import { sectionTypes } from "@/core/sections/constants";
import { useSettings } from "@/core/settings/context";
import { useTranslations } from "@/core/Translations/context";
import { settings } from "@/core/settings/request";
import BookingPopUp from "../BookingPopUp/BookingPopUp";
import { BeatLoader } from 'react-spinners'
import Alert from '../Alert/Alert';
import { Subscribe } from '@/core/subscribe/request';
import { useTranslation } from 'react-i18next'; 

const Footer = (props) => {
  const { t } = useTranslation();

  const setting = useSettings();
  const translations = useTranslations(); 
  let footerImg = require("../../assets/img/logo1.png");
  const [activeButton, setActiveButton] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [succsess, setSuccsess] = useState(false)
  const [loader, setLoader] = useState(false);
  const [responseText, setResponseText] = useState('')
  const [alertOpen, setAlertOpen] = useState(false);
  const [open, setOpen] = useState("");
  const inputRef = useRef('');
  const footerMenu =  props?.menu ;
  const updateSlug = footerMenu.filter(
    (item) => item.type_id !== sectionTypes.home
  );

  const handleOpen = (check) => {
    setOpen(check);
  };
 
   

  const handleCloseAlert = (openValue) => {
    setAlertOpen(openValue)
}

useEffect(() => {
  if (inputRef.current.value?.length > 2) {
      setActiveButton(true);
  } else {
      setActiveButton(false);
  }
}, [inputValue])

 

const sentSubscribe = async (e) => {
    e.preventDefault(); 

    try {
        setLoader(true)
        const data = {
            email: inputValue, 
        };
        const res = await Subscribe(
            data
        ); 
        setResponseText(res?.message)
        setSuccsess(true)
        setAlertOpen(true)
        setTimeout(() => {
          setAlertOpen(false);
        }, 3000);
    } catch (error) {
        if (error.response) {
            //   console.log( error.response.data ?? error.response.data?.error, 'error')  
            setSuccsess(false)
            setResponseText(error.response.data.message ?? error.response.data?.error)
            setLoader(false)
            setAlertOpen(true)
        }
        return 'An error occurred while submitting the data.';
    }
    setLoader(false) 
    setInputValue('')
}



 
  return ( 
    <footer>
      <div className="footer">
        <div className="container">
          <div className="footer-booking-now-box">
            <div className="booking-logo-left">
              <Image
                src={require("../../assets/img/frame-booking.png")}
                alt="booking-frame"
              />
            </div>
            <h1 className="booking-text">{translations?.footer_banner_text}</h1>
           {translations?.footer_banner_button_name && <button className="booking-btn"   type="button"
                        name="btn"
                        onClick={() => {
                          setOpen(true);
                        }}>{translations?.footer_banner_button_name}</button>} 
            <div className="booking-right-logo">
              <Image
                src={require("../../assets/img/frame-bookin-logo2.png")}
                alt="booking-frame"
              />
            </div>
          </div>
          <div className="footer-box">
            <div className="col-xxl-6 col-lg-6 col-md-12 col-sm-12 footer-left-side">
              <div className="footer-logo">
                <Image src={footerImg} alt="logo" />
              </div>
              <div className="hidden-footer-subscribe-box">
                <div className="subscribe-box">
                  <h3>
                  {translations?.subscribtion_description}
                  </h3>
                  <form className="subscribe-form">
                  <input type="email" placeholder={translations?.subscribtion_placeholder} ref={inputRef} onChange={() => { setInputValue(inputRef.current.value) }} value={inputValue} />
                    {loader ? <button type="button" style={{pointerEvents: activeButton ? 'initial' : 'none'}}><BeatLoader size={10} color="#fFF" /></button>
                        :
                        <button type="button" name="subscribe-btn" style={{pointerEvents: activeButton ? 'initial' : 'none'}} onClick={sentSubscribe}>{translations?.subscribe}</button>
                    }
                  </form>
                </div>
              </div>
              <div className="footer-links">
                {updateSlug?.map((item) => (
                  <Link href={item.slug} key={item.id} className="footer-link">
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
            {
                alertOpen && <Alert click={handleCloseAlert} succsess={succsess} responseText={responseText} />
            }
            <div className="col-xxl-4 col-lg-4 col-md-12 col-sm-12 footer-right-side">
              <div className="subscribe-box hidden-subscribe991">
                <h3>{translations?.subscribtion_description}</h3>
                <form className="subscribe-form">
                <input type="email" placeholder={translations?.subscribtion_placeholder} ref={inputRef} onChange={() => { setInputValue(inputRef.current.value) }} value={inputValue} />
                    {loader ? <button type="button" style={{pointerEvents: activeButton ? 'initial' : 'none'}}><BeatLoader size={10} color="#fFF" /></button>
                        :
                        <button type="button" name="subscribe-btn" style={{pointerEvents: activeButton ? 'initial' : 'none'}} onClick={sentSubscribe}>{translations?.subscribe}</button>
                    }
                </form>
                
              </div>
              <div className="soc-box">
                <h2>{translations?.footer_follow_us}</h2>
                <div className="soc-icons">
                {setting && setting[settings.facebookLink] && setting[settings.facebookLink].value &&
                     <Link href={setting[settings.facebookLink]?.value} target="blank" aria-label="Facebook">
                     <span>
                       <svg
                         width="10"
                         height="21"
                         viewBox="0 0 10 21"
                         fill="none"
                         xmlns="http://www.w3.org/2000/svg"
                       >
                         <path
                           d="M2.20217 20.7732H6.43503V10.2977H9.38799L9.70169 6.79055H6.43503V4.78914C6.43503 3.96202 6.60338 3.6389 7.41273 3.6389H9.70378V0H6.77592C3.62533 0 2.20531 1.3698 2.20531 3.99442V6.79055H0V10.3458H2.20217V20.7732Z"
                           fill="white"
                         />
                       </svg>
                     </span>
                   </Link>
                    }
                   {setting && setting[settings.youtubeLink] && setting[settings.youtubeLink].value &&
                         <Link href={setting[settings.youtubeLink]?.value} target="blank" aria-label="Youtube">
                         <span>
                           <svg
                             width="34"
                             height="24"
                             viewBox="0 0 34 24"
                             fill="none"
                             xmlns="http://www.w3.org/2000/svg"
                           >
                             <path
                               d="M13.5266 16.4193V6.87118L22.6903 11.6297L13.5266 16.4193ZM25.1156 0H8.88376C0 0 0 2.53059 0 8.75484V14.837C0 20.7562 1.25845 23.5918 8.88376 23.5918H25.1156C32.0033 23.5918 33.9994 21.9348 33.9994 14.837V8.75484C33.9994 2.20335 33.6641 0 25.1156 0Z"
                               fill="white"
                             />
                           </svg>
                         </span>
                       </Link>
                    } 
                   {setting && setting[settings.instagramLink] && setting[settings.instagramLink].value && 
                        <Link href={setting[settings.instagramLink]?.value} target="blank" aria-label="Instagram">
                        <span>
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M11.7733 0.0283939C6.87123 0.0283939 5.43762 0.0283939 5.15947 0.0566269C4.35627 0.0886903 3.56839 0.286639 2.84541 0.638018C2.34026 0.883566 1.88336 1.21792 1.4965 1.62513C0.747123 2.40591 0.269022 3.40721 0.132953 4.48084C0.00344245 5.63151 -0.0315302 6.79085 0.028386 7.94723C0.028386 8.88205 0.028386 10.1128 0.028386 11.7629C0.028386 16.6608 0.0336143 18.0933 0.0576646 18.3715C0.0911878 19.1569 0.281392 19.9277 0.617096 20.6385C0.931097 21.2798 1.38025 21.8456 1.93368 22.2968C2.4871 22.7481 3.13169 23.0742 3.82311 23.2526C4.38195 23.3865 4.95313 23.4622 5.52755 23.4785C5.81824 23.4911 8.78166 23.5005 11.7472 23.5005C14.7127 23.5005 17.6782 23.5005 17.9616 23.4827C18.557 23.4715 19.1494 23.394 19.7277 23.2516C20.421 23.0739 21.067 22.747 21.6208 22.2937C22.1746 21.8403 22.6227 21.2715 22.9337 20.627C23.2642 19.9298 23.4522 19.1736 23.4869 18.4028C23.5026 18.201 23.5099 14.9752 23.5099 11.7545C23.5099 8.53385 23.5026 5.31424 23.4869 5.11243C23.4535 4.33277 23.2613 3.56812 22.9222 2.86529C22.6748 2.34985 22.3345 1.88442 21.9184 1.49233C21.135 0.745597 20.1332 0.269232 19.0595 0.132961C17.9096 0.00343825 16.7509 -0.0315346 15.5952 0.0283939H11.7733Z"
                              fill="white"
                            />
                            <path
                              d="M11.7667 2.7666C9.32195 2.7666 9.01557 2.77706 8.05565 2.82098C7.30911 2.83593 6.57051 2.97736 5.87126 3.23924C5.27323 3.47029 4.73009 3.82377 4.27667 4.27701C3.82325 4.73025 3.46955 5.27325 3.23827 5.87119C2.97581 6.57028 2.83437 7.30898 2.82 8.05558C2.77713 9.01551 2.76562 9.32293 2.76562 11.7677C2.76562 14.2125 2.77608 14.5178 2.82 15.4777C2.83514 16.2242 2.97656 16.9628 3.23827 17.6621C3.46959 18.26 3.82317 18.803 4.27638 19.2564C4.72959 19.7098 5.27244 20.0635 5.87021 20.2951C6.56982 20.557 7.30877 20.6984 8.05565 20.7134C9.01557 20.7573 9.32195 20.7678 11.7667 20.7678C14.2115 20.7678 14.5179 20.7573 15.4778 20.7134C16.2247 20.6984 16.9636 20.5569 17.6632 20.2951C18.2608 20.0632 18.8035 19.7093 19.2567 19.256C19.7098 18.8026 20.0635 18.2598 20.2952 17.6621C20.5558 16.9625 20.6972 16.2241 20.7134 15.4777C20.7563 14.5178 20.7678 14.2114 20.7678 11.7667C20.7678 9.32189 20.7563 9.01551 20.7134 8.05558C20.6973 7.30917 20.5559 6.57077 20.2952 5.87119C20.0639 5.27325 19.7102 4.73025 19.2568 4.27701C18.8034 3.82377 18.2602 3.47029 17.6622 3.23924C16.9622 2.97752 16.2229 2.8361 15.4757 2.82098C14.5147 2.77706 14.2094 2.7666 11.7636 2.7666H11.7667ZM10.9595 4.38843H11.7667C14.1718 4.38843 14.4551 4.3968 15.4036 4.43967C15.9751 4.44751 16.541 4.55363 17.0766 4.75337C17.4647 4.90331 17.8171 5.13279 18.1111 5.42705C18.4052 5.72131 18.6345 6.07384 18.7842 6.46199C18.9841 6.9975 19.0903 7.56348 19.0979 8.13506C19.1408 9.08348 19.1502 9.36894 19.1502 11.7708C19.1502 14.1727 19.1408 14.4582 19.0979 15.4066C19.0902 15.9782 18.984 16.5441 18.7842 17.0797C18.6342 17.4675 18.4048 17.8198 18.1108 18.1138C17.8167 18.4079 17.4645 18.6373 17.0766 18.7873C16.5411 18.9873 15.9751 19.0935 15.4036 19.101C14.4551 19.1438 14.1697 19.1532 11.7667 19.1532C9.36378 19.1532 9.07832 19.1438 8.1299 19.101C7.55836 19.0929 6.99245 18.9868 6.45683 18.7873C6.06845 18.6363 5.71602 18.4056 5.42227 18.11C5.12852 17.8145 4.89996 17.4606 4.75135 17.0713C4.5514 16.5358 4.44528 15.9698 4.43765 15.3983C4.39477 14.4498 4.38536 14.1644 4.38536 11.7604C4.38536 9.35639 4.39373 9.07302 4.43765 8.1246C4.44549 7.55305 4.55161 6.9871 4.75135 6.45153C4.90122 6.06331 5.13067 5.71075 5.42492 5.41649C5.71918 5.12223 6.07175 4.89279 6.45997 4.74291C6.99548 4.54297 7.56146 4.43685 8.13303 4.42921C8.96329 4.39157 9.28327 4.38007 10.9626 4.37902L10.9595 4.38843ZM16.5674 5.88373C16.3537 5.88373 16.1449 5.94709 15.9673 6.06578C15.7896 6.18447 15.6512 6.35317 15.5694 6.55054C15.4877 6.74792 15.4663 6.96511 15.508 7.17464C15.5496 7.38417 15.6525 7.57664 15.8036 7.72771C15.9546 7.87877 16.1471 7.98165 16.3566 8.02333C16.5662 8.065 16.7834 8.04361 16.9807 7.96186C17.1781 7.8801 17.3468 7.74165 17.4655 7.56402C17.5842 7.38639 17.6476 7.17755 17.6476 6.96391C17.6476 6.67743 17.5337 6.40268 17.3312 6.20011C17.1286 5.99754 16.8539 5.88373 16.5674 5.88373ZM11.7625 7.14585C10.8485 7.14585 9.95493 7.41689 9.19489 7.9247C8.43485 8.43251 7.84246 9.15428 7.49261 9.99875C7.14276 10.8432 7.05118 11.7725 7.22943 12.669C7.40768 13.5655 7.84776 14.3891 8.49403 15.0355C9.14031 15.6819 9.96374 16.1222 10.8602 16.3006C11.7567 16.4791 12.686 16.3877 13.5305 16.038C14.3751 15.6884 15.097 15.0961 15.605 14.3362C16.1129 13.5763 16.3842 12.6828 16.3844 11.7687C16.3844 10.5429 15.8975 9.36717 15.0307 8.50024C14.164 7.63331 12.9884 7.14613 11.7625 7.14585ZM11.7625 8.76768C12.3559 8.76768 12.9359 8.94363 13.4293 9.27328C13.9226 9.60292 14.3071 10.0715 14.5342 10.6196C14.7613 11.1678 14.8207 11.771 14.7049 12.353C14.5892 12.9349 14.3034 13.4695 13.8839 13.889C13.4643 14.3086 12.9298 14.5943 12.3478 14.7101C11.7659 14.8258 11.1627 14.7664 10.6145 14.5394C10.0663 14.3123 9.59776 13.9278 9.26812 13.4344C8.93847 12.9411 8.76252 12.361 8.76252 11.7677C8.76252 11.3734 8.84026 10.9829 8.99129 10.6187C9.14231 10.2544 9.36367 9.92352 9.64269 9.64489C9.92171 9.36625 10.2529 9.14536 10.6174 8.99484C10.9818 8.84432 11.3724 8.76713 11.7667 8.76768H11.7625Z"
                              fill="#1E2E38"
                              stroke="white"
                              strokeWidth="0.159466"
                            />
                          </svg>
                        </span>
                      </Link>
                    } 
                    {setting && setting[settings.linkdinLink] && setting[settings.linkdinLink].value && 
                     <Link href={setting[settings.linkdinLink]?.value} target="blank" aria-label="Linkedin">
                     <span>
                       <svg
                         width="25"
                         height="25"
                         viewBox="0 0 25 25"
                         fill="none"
                         xmlns="http://www.w3.org/2000/svg"
                       >
                         <g clipPath="url(#clip0_1_128)">
                           <path
                             d="M5.81553 8.0332H0.795515C0.688649 8.0332 0.586161 8.07574 0.510595 8.15146C0.43503 8.22717 0.392578 8.32987 0.392578 8.43695V24.595C0.392578 24.7021 0.43503 24.8048 0.510595 24.8805C0.586161 24.9562 0.688649 24.9988 0.795515 24.9988H5.81468C5.92154 24.9988 6.02403 24.9562 6.0996 24.8805C6.17516 24.8048 6.21761 24.7021 6.21761 24.595V8.43695C6.21761 8.33002 6.17528 8.22745 6.0999 8.15176C6.02452 8.07607 5.92225 8.03343 5.81553 8.0332Z"
                             fill="white"
                           />
                           <path
                             d="M3.30818 1.10816e-07C2.65375 0.000169638 2.01407 0.194771 1.47001 0.559199C0.925958 0.923627 0.501964 1.44151 0.251642 2.04738C0.00131945 2.65324 -0.0640885 3.31988 0.0636881 3.96299C0.191465 4.6061 0.506687 5.19681 0.969499 5.66042C1.43231 6.12403 2.02193 6.43973 2.66379 6.56759C3.30566 6.69545 3.97095 6.62974 4.57555 6.37877C5.18015 6.12779 5.6969 5.70282 6.06046 5.15759C6.42403 4.61236 6.61808 3.97135 6.61808 3.31562C6.61808 2.88013 6.53246 2.44891 6.36611 2.04659C6.19976 1.64426 5.95594 1.27871 5.64858 0.970819C5.34122 0.662924 4.97633 0.418715 4.57476 0.25214C4.17319 0.0855654 3.7428 -0.000112476 3.30818 1.10816e-07Z"
                             fill="white"
                           />
                           <path
                             d="M18.5835 7.63109C17.7598 7.61442 16.9419 7.77088 16.1823 8.09038C15.4227 8.40988 14.7384 8.88532 14.1734 9.48605V8.43685C14.1734 8.32977 14.131 8.22709 14.0554 8.15137C13.9798 8.07566 13.8773 8.03312 13.7705 8.03312H8.96348C8.85661 8.03312 8.75412 8.07566 8.67855 8.15137C8.60299 8.22709 8.56055 8.32977 8.56055 8.43685V24.5966C8.56055 24.7037 8.60299 24.8064 8.67855 24.8821C8.75412 24.9578 8.85661 25.0004 8.96348 25.0004H13.9724C14.0792 25.0004 14.1817 24.9578 14.2573 24.8821C14.3329 24.8064 14.3753 24.7037 14.3753 24.5966V16.6025C14.3753 13.9083 15.1059 12.8591 16.9794 12.8591C19.0206 12.8591 19.1832 14.5418 19.1832 16.7413V24.5966C19.1832 24.7037 19.2256 24.8064 19.3012 24.8821C19.3768 24.9578 19.4792 25.0004 19.5861 25.0004H24.5967C24.7036 25.0004 24.8061 24.9578 24.8816 24.8821C24.9572 24.8064 24.9996 24.7037 24.9996 24.5966V15.7333C24.9996 11.7259 24.2374 7.63109 18.5835 7.63109Z"
                             fill="white"
                           />
                         </g>
                       </svg>
                     </span>
                   </Link>
                    } 
                </div>
              </div>
            </div>
          </div>
        </div>
      <div className="create-footer-bottom">
        <div className="container">
          <div className="bottom-footer-cont">
            <div className="footer-upper-list">
            {
              translations?.copyright && 
              <Link href={'#'} className='copyright-link'>
              {translations?.copyright} 
           </Link> 
            }
              {props.upperMenu?.map((menuItem, index) =>
                    <Link href={menuItem.slug} key={index}>
                      {menuItem.title}
                    </Link> 
                  )}
            </div>
            <div className="copyr">
              <span>{translations?.developed}</span>
            </div>
          </div>
        </div>
      </div>
      </div>
      <div className="booking-btn-01">
            {open && <BookingPopUp hancleClick={handleOpen} />}
          </div>  
    </footer> 
  );
};

export default Footer;
