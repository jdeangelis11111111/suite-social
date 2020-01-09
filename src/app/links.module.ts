export class Links {


    // ************************ War SUITE  IP Address
    public static base = 'https://shieldcrypt.com:7384/SuiteSocial/';
    // public static base = 'https://shieldcrypt.com:7384/SuiteSocial1/';
    // public static base = 'http://192.168.1.19:8080';

    // Sign In
    public static SIGNIN = Links.base + 'user_login';

    // Influencer Register
    public static INFLUNCERREGISTER = Links.base + 'create_influencer';

    // Verify Organisation
    public static VERIFYORGANISATION = Links.base + 'verify_Organization';

    // CREATE Organisation
    public static CREATEORGANISATION = Links.base + 'create_org';

    // Verify Otp
    public static OTPVERIFY = Links.base + 'verify_otp';

    // Resend Otp
    public static RESENDOTP = Links.base + 'resend_otp';

    //Forget pass
    public static FORGETPASS = Links.base + 'forget_password';
    public static RESETPASS = Links.base + 'reset_password';


    public static SUBMITBRANDFORM = Links.base + 'Save_ComponySurvey_Details';//
    public static SUBMITINFFORM = Links.base + 'Save_Influencer_Survey_Details';
    public static GETALLINF = Links.base + 'influencer_list';//
    public static GETALLBRAND = Links.base + 'organization_list';//
    public static GETSEARCHBRAND = Links.base + 'cmny_search_by_criteria';
    public static GETSEARCHINF = Links.base + 'search_Influencer_Survey_by_criteria';

    public static SENDMSG = Links.base + 'messanging/sendingMessage';
    public static GETALLMSG = Links.base + 'messanging/recentMessage';
    public static GETDETAILMSG = Links.base + 'messanging/showmessageList';//showSingleMessage
    public static POSTCAMPAIGN = Links.base + 'add_PostCampaign';
    public static DELETEMSG = Links.base + 'messanging/deleteMessage';

    public static GETPOSTBYEMAIL = Links.base + 'get_post_campaign_by_email';
    public static GETFORM = Links.base + 'get_company_survey_by_email';
    public static UPDBRANDFORM = Links.base + 'edit_company_survey';
    public static GETINFFORM = Links.base + 'get_influencer_survey_by_email';
    public static UPDATEINFFORM = Links.base + 'edit_influencer_survey';
    public static RATEINF = Links.base + 'review/save_brand_to_influencer_rating';
    public static RATEBRAND = Links.base + 'review/save_influencer_to_brand_rating';

    public static GETREVIEWB = Links.base + 'review/get_influencer_to_brand_rating_by_email';
    public static GETREVIEW = Links.base + 'review/get_brand_to_influencer_rating_by_email';

    public static GETCAMPCOUNT = Links.base + 'get_post_campaign_count_by_email';
    public static GETIMG = Links.base + '';
    public static UPDIMG = Links.base + 'ra';
    public static PAYPALPAYMENT = Links.base + 'save_transaction_history';
    public static GETTRANSACTS = Links.base + 'get_transaction_history_by_email';

}
