<template>
    <div class="bigbox">
        <div class="phone_head phone_show width_100">
            <div class="width_90 margin_auto height_100 display_flex flex_jusify_space flex_align_center">
                <div class="option_animate display_flex overflow_hidden flex_align_center" :class="{selected_op:show_option_var}" @click.stop="show_option">
                    <div class="display_flex line_box white flex_jusify_space flex_column">
                        <div class="first"></div>
                        <div class="secend"></div>
                        <div class="last"></div>
                    </div>
                </div>
                <img src="../../static/img/html5games_logo.png" class="logo_img" alt="">
                <lang-select :selectWhatLang="select_lang_val" @selectLang="selectLang"></lang-select>
            </div>
        </div>
    </div>
</template>

<script>
    import langSelect from "../lang_select"
    import videoButton from "../button"
    import getCountry from "../../util/get_country";
    import getLang from "../../util/get_lang";
    import bus from "../../util/bus"
    export default {
        data() {
            return {
                search_word: "",
                clickSelect: '',
                selectOrder: '',
                showWhich: '',
                select_lang_val: "en",
                show_option_var: false,
                arr: [{
                        name: this.$t('words.most_recent'),
                        id: "-create_time",
                    },
                    {
                        name: this.$t('words.most_liked'),
                        id: "-favor_num",
                    },
                    {
                        name: this.$t('words.most_viewed'),
                        id: "-show_num",
                    }
                ]
            }
        },
        components: {
            videoButton,
            langSelect
        },
        mounted() {
            this.setCurrentLangSelect();
            this.watchBusOptoin();
        },
        methods: {
            watchBusOptoin(){
                bus.$on('option_state',(v)=>{
                    this.show_option_var = v;
                    this.$emit('changeOption',this.show_option_var);
                })
            },
            setCurrentLangSelect() {
                this.$nextTick(() => {
                    this.select_lang_val = getLang();
                })
            },
            selectLang(val) {
                this.select_lang_val = val;
                location.href = location.host.match(/http/) ?
                    "" :
                    "http://" + `${location.host}/?lang=${val}`;
            },
            show_option() {
                this.show_option_var = !this.show_option_var;
                this.$emit('changeOption',this.show_option_var);
            },
            Search() {
                bus.$emit("search", this.search_word);
                this.showWhich = ""
                this.$store.commit("search", this.search_word);
                this.search_word = "";
                this.$router.push({
                    path: "/"
                })
            },
            goHome() {
                this.$router.push({
                    path: "/?country=" + getCountry()
                })
            },
            showLogin() {
                this.$emit("showLogin");
            },
            toCate() {
                this.showWhich = "";
                this.$router.push({
                    name: "index-index-categaray"
                })
            },
            orderselect(ordering) {
                this.clickSelect = "";
                this.selectOrder = ordering;
                // alert(ordering);
            },
            getList(ordering, pc_ph) {
                if (pc_ph == "pc") {
                    this.clickSelect = ordering;
                } else if (pc_ph == "ph") {
                    this.showWhich = "";
                }
                if (this.$route.name != "index-index") {
                    this.$router.push({
                        name: "index-index"
                    });
                }
                bus.$emit("ordering", ordering);
            },
            showWichbox(type, mouse) {
                if (mouse) {
                    if (screen.width < 800) {
                        return
                    }
                    this.showWhich = ""
                } else {
                    this.showWhich = type == this.showWhich ? "" : type;
                }
            },
        }
    }
</script>

<style lang='less'>
    @import "../../assets/css/current_theme";
    @transition_time: 0.3s;
    .bigbox {
        height: 10px;
        background: @app_orange;
        @media screen and (max-width: 800px) {
            .logo_img {
                height: 40px;
            }
            .option_animate {
                padding: 0 10px;
                height: 40px;
                width: 35px;
                &>div {
                    width: 100%;
                    height: 25px;
                    div {
                        transition: @transition_time;
                        width: 100%;
                        height: 3px;
                        border-radius: 1.5px;
                        background: @app_font_color;
                    }
                }
            }
            .selected_op {
                .first {
                    transform-origin: 0 0;
                    transform: translateX(4px) rotate(39deg);
                }
                .secend {
                    opacity: 0;
                }
                .last {
                    transform-origin: 0 100%;
                    transform: translateX(4px) rotate(-39deg);
                }
            }
            & {
                height: 60px;
                display: flex;
                align-items: flex-end;
                .phone_head {
                    height: 50px;
                    background: @app_gray;
                }
            }
        }
    }
</style>