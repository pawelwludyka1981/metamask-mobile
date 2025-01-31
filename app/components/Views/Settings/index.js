import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { StyleSheet, ScrollView, Platform } from 'react-native';

import SettingsDrawer from '../../UI/SettingsDrawer';
import { colors } from '../../../styles/common';
import { getClosableNavigationOptions } from '../../UI/Navbar';
import { strings } from '../../../../locales/i18n';
import Analytics from '../../../core/Analytics';
import ANALYTICS_EVENT_OPTS from '../../../util/analytics';
import AndroidBackHandler from '../AndroidBackHandler';

const styles = StyleSheet.create({
	wrapper: {
		backgroundColor: colors.white,
		flex: 1,
		paddingLeft: 18
	}
});

/**
 * Main view for app configurations
 */
export default class Settings extends PureComponent {
	static navigationOptions = ({ navigation }) =>
		getClosableNavigationOptions(strings('app_settings.title'), strings('navigation.close'), navigation);

	static propTypes = {
		/**
		/* navigation object required to push new views
		*/
		navigation: PropTypes.object
	};

	render = () => {
		/* eslint-disable */
		/* prettier-ignore */
		const { navigation } = this.props;
		return (
			<ScrollView style={styles.wrapper}>
				<SettingsDrawer
					description={strings('app_settings.general_desc')}
					onPress={() => {
						Analytics.trackEvent(ANALYTICS_EVENT_OPTS.SETTINGS_GENERAL);
						navigation.push('GeneralSettings');
					}}
					title={strings('app_settings.general_title')}
				/>
				<SettingsDrawer
					description={strings('app_settings.advanced_desc')}
					onPress={() => {
						Analytics.trackEvent(ANALYTICS_EVENT_OPTS.SETTINGS_ADVANCED);
						navigation.push('AdvancedSettings');
					}}
					title={strings('app_settings.advanced_title')}
				/>
				<SettingsDrawer
					description={strings('app_settings.security_desc')}
					onPress={() => {
						Analytics.trackEvent(ANALYTICS_EVENT_OPTS.SETTINGS_SECURITY_AND_PRIVACY);
						navigation.push('SecuritySettings');
					}}
					title={strings('app_settings.security_title')}
				/>
				<SettingsDrawer
					title={strings('app_settings.networks_title')}
					description={strings('app_settings.networks_desc')}
					onPress={() => {
						navigation.push('NetworksSettings');
					}}
				/>
				<SettingsDrawer
					title={strings('app_settings.experimental_title')}
					description={strings('app_settings.experimental_desc')}
					onPress={() => {
						Analytics.trackEvent(ANALYTICS_EVENT_OPTS.SETTINGS_EXPERIMENTAL);
						navigation.push('ExperimentalSettings');
					}}
				/>
				<SettingsDrawer
					title={strings('app_settings.info_title')}
					onPress={() => {
						Analytics.trackEvent(ANALYTICS_EVENT_OPTS.SETTINGS_ABOUT);
						navigation.push('CompanySettings');
					}}
				/>
				{Platform.OS === 'android' && <AndroidBackHandler navigation={navigation} />}
			</ScrollView>
		);
	};
}
