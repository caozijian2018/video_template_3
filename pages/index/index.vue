<template>
    <div class="container  display_flex transitions_time flex_column" :class="{outer_box:show_left_option}" :style="{height:height_}">
        <video-head @showLogin="showLogin" class="" @changeOption="watchBusOfOption" :class="{height0:is_scroll_bottom}"></video-head>
        <div class="flex_1 overflow_scroll scroll_box" >
            <login-box v-if="show_login" @close="show_login=false"></login-box>
            <nuxt-child @changeOption="watchBusOfOption"  style="overflow-x:hidden" :show-left-option="show_left_option" :is-scroll-bottom="is_scroll_bottom"></nuxt-child>
        </div>
    </div>
</template>

<script>
    import videoHead from "../../components/videoHead"
    import loginBox from "../../components/loginBox"
    import initLanguage from "../../util/init_language";
    import initOp from "../../util/init_op";
    import isScrollBottom from "../../util/is_scroll_bottom";
    
    export default {
        components: {
            videoHead,
            loginBox
        },
        data() {
            return {
                prev_scroll: 0,
                height_: "",
                show_login: false,
                is_scroll_bottom: false,
                show_left_option: false
            }
        },
        mounted() {
            this.saveLang();
            this.saveOp();
            this.setHeight();
            this.watchOnresize();
        },
        methods: {
            watchBusOfOption(v) {
                this.show_left_option = v;
            },
            scroll(res) {
                var is_scroll_bottom = isScrollBottom(res, this);
                this.is_scroll_bottom = is_scroll_bottom;
            },
            saveLang() {
                var lang = this.$route.query.lang;
                initLanguage(lang)
            },
            saveOp() {
                var op = this.$route.query.op;
                initOp(op)
            },
            showLogin() {
                this.show_login = true;
            },
            watchOnresize() {
                window.onresize = this.setHeight;
            },
            setHeight() {
                this.height_ = innerHeight + "px";
            }
        }
    }
</script>

<style lang='less'>
    @media screen and (max-width:800px) {
        .bigbox{
            // transform: translateX(0px);
        }
        .transitions_time{
            transition: .4s;
        }
        .outer_box {
            
            transform: translateX(300px);
        }
    }
</style>